import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSearch, Plus, RefreshCw, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FilingCard, Filing } from '@/components/track/FilingCard';
import { FilingFilters } from '@/components/track/FilingFilters';
import { FilingStatus } from '@/components/track/StatusTimeline';
import { AnimatedList, AnimatedGrid } from '@/components/ui/AnimatedList';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { staggerContainer, fadeInUp } from '@/lib/animations';
// Mock data - in real app, this would come from API/database
const mockFilings: Filing[] = [
  {
    id: '1',
    taxYear: '2024',
    filingType: 'Personal Income Tax',
    submittedAt: '2024-01-15T10:30:00Z',
    status: 'pending_payment',
    amount: 45000,
    referenceNumber: 'PTF-2024-001234',
    lastUpdated: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    taxYear: '2024',
    filingType: 'Personal Income Tax',
    submittedAt: '2024-01-10T14:20:00Z',
    status: 'in_processing',
    amount: 32000,
    referenceNumber: 'PTF-2024-001189',
    lastUpdated: '2024-01-14T09:15:00Z',
  },
  {
    id: '3',
    taxYear: '2023',
    filingType: 'Personal Income Tax',
    submittedAt: '2023-12-20T09:00:00Z',
    status: 'completed',
    amount: 28500,
    referenceNumber: 'PTF-2023-005678',
    lastUpdated: '2024-01-05T16:45:00Z',
  },
  {
    id: '4',
    taxYear: '2023',
    filingType: 'Personal Income Tax',
    submittedAt: '2023-11-15T11:30:00Z',
    status: 'payment_verified',
    amount: 15000,
    referenceNumber: 'PTF-2023-004521',
    lastUpdated: '2023-12-01T10:00:00Z',
  },
  {
    id: '5',
    taxYear: '2022',
    filingType: 'Personal Income Tax',
    submittedAt: '2022-12-10T08:45:00Z',
    status: 'completed',
    amount: 22000,
    referenceNumber: 'PTF-2022-003456',
    lastUpdated: '2023-01-20T14:30:00Z',
  },
  {
    id: '6',
    taxYear: '2024',
    filingType: 'Personal Income Tax',
    submittedAt: '2024-01-12T16:00:00Z',
    status: 'pending_verification',
    amount: 38000,
    referenceNumber: 'PTF-2024-001201',
    lastUpdated: '2024-01-13T11:00:00Z',
  },
];

const TrackFiling = () => {
  const navigate = useNavigate();
  const [filings] = useState<Filing[]>(mockFilings);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilingStatus | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [yearFilter, setYearFilter] = useState('all');

  // Calculate active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (statusFilter !== 'all') count++;
    if (yearFilter !== 'all') count++;
    return count;
  }, [searchQuery, statusFilter, yearFilter]);

  // Filter and sort filings
  const filteredFilings = useMemo(() => {
    let result = [...filings];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (f) =>
          f.referenceNumber.toLowerCase().includes(query) ||
          f.filingType.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((f) => f.status === statusFilter);
    }

    // Year filter
    if (yearFilter !== 'all') {
      result = result.filter((f) => f.taxYear === yearFilter);
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.submittedAt).getTime();
      const dateB = new Date(b.submittedAt).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return result;
  }, [filings, searchQuery, statusFilter, yearFilter, sortOrder]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setYearFilter('all');
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API refresh
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    toast({
      title: 'Refreshed',
      description: 'Filing statuses have been updated.',
    });
  };

  const handleFilingAction = (action: string, filing: Filing) => {
    switch (action) {
      case 'cta':
        if (filing.status === 'pending_payment') {
          toast({
            title: 'Redirecting to Payment',
            description: `Processing payment for ${filing.referenceNumber}`,
          });
        } else if (filing.status === 'completed') {
          toast({
            title: 'Downloading Certificate',
            description: 'Your tax certificate is being prepared.',
          });
        } else {
          toast({
            title: 'Filing Details',
            description: `Viewing details for ${filing.referenceNumber}`,
          });
        }
        break;
      case 'view':
        toast({
          title: 'View Details',
          description: `Opening details for ${filing.referenceNumber}`,
        });
        break;
      case 'download':
        toast({
          title: 'Downloading',
          description: 'Preparing your documents for download.',
        });
        break;
      case 'certificate':
        toast({
          title: 'Certificate Ready',
          description: 'Your tax certificate is ready for download.',
        });
        break;
    }
  };

  // Stats summary
  const stats = useMemo(() => {
    const pending = filings.filter(
      (f) => f.status === 'pending_payment' || f.status === 'pending_verification'
    ).length;
    const processing = filings.filter(
      (f) => f.status === 'payment_verified' || f.status === 'in_processing'
    ).length;
    const completed = filings.filter((f) => f.status === 'completed').length;
    return { pending, processing, completed, total: filings.length };
  }, [filings]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <FileSearch className="w-7 h-7 text-primary" />
            Track Your Filings
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor the status of your tax filings
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => navigate('/tax-filing')} className="gap-2">
            <Plus className="w-4 h-4" />
            New Filing
          </Button>
        </div>
      </motion.div>

      {/* Stats summary cards */}
      <AnimatedGrid
        items={[
          { label: 'Total Filings', value: stats.total, color: 'bg-primary/10 text-primary' },
          { label: 'Pending', value: stats.pending, color: 'bg-amber-500/10 text-amber-600' },
          { label: 'Processing', value: stats.processing, color: 'bg-purple-500/10 text-purple-600' },
          { label: 'Completed', value: stats.completed, color: 'bg-emerald-500/10 text-emerald-600' },
        ]}
        keyExtractor={(stat) => stat.label}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        staggerDelay={0.06}
        renderItem={(stat) => (
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg ${stat.color} transition-colors`}
          >
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm opacity-80">{stat.label}</p>
          </motion.div>
        )}
      />

      {/* Filters */}
      <motion.div variants={fadeInUp}>
        <FilingFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          yearFilter={yearFilter}
          onYearChange={setYearFilter}
          activeFiltersCount={activeFiltersCount}
          onClearFilters={handleClearFilters}
        />
      </motion.div>

      {/* Filing cards */}
      {filteredFilings.length > 0 ? (
        <AnimatedList
          items={filteredFilings}
          keyExtractor={(filing) => filing.id}
          staggerDelay={0.05}
          showGradients={filteredFilings.length > 5}
          className="space-y-4"
          exitAnimation
          renderItem={(filing) => (
            <FilingCard filing={filing} onAction={handleFilingAction} />
          )}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Inbox className="w-16 h-16 text-muted-foreground/50" />
          </motion.div>
          <h3 className="mt-4 text-lg font-medium text-foreground">No filings found</h3>
          <p className="text-muted-foreground mt-1">
            {activeFiltersCount > 0
              ? 'Try adjusting your filters'
              : "You haven't submitted any tax filings yet"}
          </p>
          {activeFiltersCount > 0 ? (
            <Button variant="outline" onClick={handleClearFilters} className="mt-4">
              Clear Filters
            </Button>
          ) : (
            <Button onClick={() => navigate('/tax-filing')} className="mt-4 gap-2">
              <Plus className="w-4 h-4" />
              Start Your First Filing
            </Button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default TrackFiling;
