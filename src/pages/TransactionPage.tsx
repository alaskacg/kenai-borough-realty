import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, CheckCircle, DollarSign } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Transaction } from '../types';

export default function TransactionPage() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTransaction();
    }
  }, [id]);

  const fetchTransaction = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, property:properties(*), buyer:profiles!buyer_id(*), seller:profiles!seller_id(*)')
      .eq('id', id)
      .single();

    if (!error && data) {
      setTransaction(data);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>;
  }

  if (!transaction) {
    return <div className="min-h-screen flex items-center justify-center">
      <p>Transaction not found</p>
    </div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'escrow': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Transaction Details</h1>

        <div className="space-y-6">
          {/* Status */}
          <div className="card">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold mb-2">Transaction Status</h2>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(transaction.status)}`}>
                  {transaction.status}
                </span>
              </div>
              {transaction.status === 'escrow' && transaction.escrow_release_at && (
                <div className="text-right">
                  <p className="text-sm text-gray-600">Escrow Release In</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {Math.max(0, Math.floor((new Date(transaction.escrow_release_at).getTime() - Date.now()) / (1000 * 60 * 60)))}h
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Property Info */}
          <div className="card">
            <h3 className="font-bold mb-4">Property</h3>
            <p className="text-lg font-semibold">{transaction.property?.title}</p>
            <p className="text-gray-600">{transaction.property?.address_line1}, {transaction.property?.city}</p>
          </div>

          {/* Payment Details */}
          <div className="card">
            <h3 className="font-bold mb-4">Payment Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Purchase Amount</span>
                <span className="font-semibold">${transaction.total_amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Platform Fee (3%)</span>
                <span className="font-semibold text-red-600">-${transaction.platform_fee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 bg-green-50 -mx-6 px-6">
                <span className="font-bold">Seller Receives</span>
                <span className="font-bold text-green-600">${transaction.seller_amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="card">
            <h3 className="font-bold mb-4">Transaction Timeline</h3>
            <div className="space-y-4">
              {transaction.created_at && (
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Transaction Created</p>
                    <p className="text-sm text-gray-600">{new Date(transaction.created_at).toLocaleString()}</p>
                  </div>
                </div>
              )}
              {transaction.escrow_started_at && (
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">Funds in Escrow</p>
                    <p className="text-sm text-gray-600">{new Date(transaction.escrow_started_at).toLocaleString()}</p>
                  </div>
                </div>
              )}
              {transaction.released_at && (
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Funds Released to Seller</p>
                    <p className="text-sm text-gray-600">{new Date(transaction.released_at).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
