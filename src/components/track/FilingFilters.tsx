import { motion } from 'framer-motion';
import { Filter, SortAsc, SortDesc, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FilingStatus } from './StatusTimeline';
import { cn } from '@/lib/utils';

interface FilingFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: FilingStatus | 'all';
  onStatusChange: (status: FilingStatus | 'all') => void;
  sortOrder: 'asc' | 'desc';
  onSortChange: (order: 'asc' | 'desc') => void;
  yearFilter: string;
  onYearChange: (year: string) => void;
  activeFiltersCount: number;
  onClearFilters: () => void;
}

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'pending_payment', label: 'Pending Payment' },
  { value: 'pending_verification', label: 'Pending Verification' },
  { value: 'payment_verified', label: 'Payment Verified' },
  { value: 'in_processing', label: 'In Processing' },
  { value: 'completed', label: 'Completed' },
];

const yearOptions = [
  { value: 'all', label: 'All Years' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
];

export const FilingFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortOrder,
  onSortChange,
  yearFilter,
  onYearChange,
  activeFiltersCount,
  onClearFilters,
}: FilingFiltersProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Search and main filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by reference number..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-9"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status filter */}
        <Select value={statusFilter} onValueChange={(v) => onStatusChange(v as FilingStatus | 'all')}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Year filter */}
        <Select value={yearFilter} onValueChange={onYearChange}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Tax Year" />
          </SelectTrigger>
          <SelectContent>
            {yearOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="shrink-0"
        >
          <motion.div
            key={sortOrder}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {sortOrder === 'asc' ? (
              <SortAsc className="w-4 h-4" />
            ) : (
              <SortDesc className="w-4 h-4" />
            )}
          </motion.div>
        </Button>
      </div>

      {/* Active filters indicator */}
      {activeFiltersCount > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-2"
        >
          <Badge variant="secondary" className="gap-1">
            <Filter className="w-3 h-3" />
            {activeFiltersCount} active filter{activeFiltersCount > 1 ? 's' : ''}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs text-muted-foreground hover:text-foreground h-6"
          >
            Clear all
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FilingFilters;
