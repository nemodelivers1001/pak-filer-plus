import { motion } from 'framer-motion';
import { Calendar, ChevronRight, FileText, Receipt, AlertCircle, CheckCircle2, Clock, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { StatusTimeline, FilingStatus, getStatusLabel, getStatusColor } from './StatusTimeline';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export interface Filing {
  id: string;
  taxYear: string;
  filingType: string;
  submittedAt: string;
  status: FilingStatus;
  amount?: number;
  referenceNumber: string;
  lastUpdated: string;
}

interface FilingCardProps {
  filing: Filing;
  onAction?: (action: string, filing: Filing) => void;
}

const getStatusBadgeVariant = (status: FilingStatus) => {
  switch (status) {
    case 'pending_payment':
      return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    case 'pending_verification':
      return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
    case 'payment_verified':
      return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    case 'in_processing':
      return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
    case 'completed':
      return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getCTAButton = (status: FilingStatus, onAction: () => void) => {
  switch (status) {
    case 'pending_payment':
      return (
        <Button onClick={onAction} className="w-full sm:w-auto gap-2">
          <Receipt className="w-4 h-4" />
          Pay Now
        </Button>
      );
    case 'pending_verification':
      return (
        <Button variant="outline" onClick={onAction} className="w-full sm:w-auto gap-2">
          <Clock className="w-4 h-4" />
          Check Status
        </Button>
      );
    case 'payment_verified':
    case 'in_processing':
      return (
        <Button variant="outline" onClick={onAction} className="w-full sm:w-auto gap-2">
          <AlertCircle className="w-4 h-4" />
          View Details
        </Button>
      );
    case 'completed':
      return (
        <Button variant="outline" onClick={onAction} className="w-full sm:w-auto gap-2">
          <FileText className="w-4 h-4" />
          Download Certificate
        </Button>
      );
    default:
      return null;
  }
};

export const FilingCard = ({ filing, onAction }: FilingCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAction = (action: string) => {
    onAction?.(action, filing);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-colors duration-300 hover:shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <motion.div 
                className="p-2 rounded-lg bg-primary/10"
                whileHover={{ scale: 1.05 }}
              >
                <FileText className="w-5 h-5 text-primary" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-foreground">
                  Tax Year {filing.taxYear}
                </h3>
                <p className="text-sm text-muted-foreground">{filing.filingType}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className={cn("font-medium", getStatusBadgeVariant(filing.status))}
              >
                {getStatusLabel(filing.status)}
              </Badge>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleAction('view')}>
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction('download')}>
                    Download Documents
                  </DropdownMenuItem>
                  {filing.status === 'completed' && (
                    <DropdownMenuItem onClick={() => handleAction('certificate')}>
                      Download Certificate
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Quick info row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Submitted: {new Date(filing.submittedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs">REF:</span>
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{filing.referenceNumber}</code>
            </div>
            {filing.amount !== undefined && (
              <div className="flex items-center gap-1.5">
                <span>Amount:</span>
                <span className="font-medium text-foreground">PKR {filing.amount.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Compact timeline (always visible) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Progress:</span>
              <StatusTimeline currentStatus={filing.status} compact />
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs gap-1"
            >
              {isExpanded ? 'Hide' : 'Show'} Timeline
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-3 h-3" />
              </motion.div>
            </Button>
          </div>

          {/* Expanded timeline */}
          <motion.div
            initial={false}
            animate={{ 
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0 
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2 border-t border-border/50">
              <StatusTimeline currentStatus={filing.status} />
            </div>
          </motion.div>

          {/* CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date(filing.lastUpdated).toLocaleDateString()}
            </p>
            {getCTAButton(filing.status, () => handleAction('cta'))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FilingCard;
