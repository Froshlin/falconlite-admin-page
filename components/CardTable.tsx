'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CheckCircle, MoreVertical, Trash2 } from 'lucide-react';
import clipboard from '@/public/clipboard-icon.png';
import { CardTableProps, CardDetails } from '@/types/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Modal } from '@/components/Modal';
import { fetchCardDetails, deleteCard } from '@/lib/api';

export const CardTable = ({ cards, currentPage, itemsPerPage, onDeleteCard }: CardTableProps) => {
  const router = useRouter();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCards = cards.slice(startIndex, startIndex + itemsPerPage);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [cardDetails, setCardDetails] = useState<CardDetails | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = (cardNumber: string, id: string) => {
    navigator.clipboard.writeText(cardNumber);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-[rgba(15,213,130,0.1)] text-[#0FD582] text-[10px] font-semibold px-[10px] py-[5px] w-[88px] h-[25px] rounded-[30px]';
      case 'Terminated':
        return 'bg-[rgba(232,40,40,0.3)] text-[#E82828] text-[10px] font-semibold px-[10px] py-[5px] w-[88px] h-[25px] rounded-[30px]';
      case 'Freezed':
        return 'bg-[rgba(223,197,0,0.3)] text-[#DFC500] text-[10px] font-semibold px-[10px] py-[5px] w-[88px] h-[25px] rounded-[30px]';
      default:
        return '';
    }
  };

  const getModalStatusStyles = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-[rgba(15,213,130,0.1)] text-[#0FD582] text-xs font-semibold px-3 py-1 rounded-full';
      case 'Terminated':
        return 'bg-[rgba(232,40,40,0.3)] text-[#E82828] text-xs font-semibold px-3 py-1 rounded-full';
      default:
        return '';
    }
  };

  const handleViewCardDetails = async (cardId: string) => {
    try {
      const details = await fetchCardDetails(cardId);
      setCardDetails(details);
      setSelectedCardId(cardId);
      setIsDetailsModalOpen(true);
      setError(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Failed to load card details');
    }
  };

  const handleViewCardTransactions = (cardId: string) => {
    router.push(`/cards/all-cards/${cardId}`);
  };

  const handleDeleteCard = async (cardId: string) => {
    if (confirm('Are you sure you want to delete this card?')) {
      try {
        await deleteCard(cardId);
        if (onDeleteCard) {
          onDeleteCard(cardId);
        }
        setError(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to delete card');
      }
    }
  };

  return (
    <>
      <Table>
        <TableHeader className='px-6'>
          <TableRow className='px-4'>
            <TableHead className='py-7'>CARD ID</TableHead>
            <TableHead className='py-7'>BALANCE</TableHead>
            <TableHead className='py-7'>DATE</TableHead>
            <TableHead className='py-7'>CARD BRAND</TableHead>
            <TableHead className='py-7'>CARD TYPE</TableHead>
            <TableHead className='py-7'>CARD NO</TableHead>
            <TableHead className="text-center py-7">STATUS</TableHead>
            <TableHead className="text-right py-7">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCards.map((card, index) => (
            <TableRow key={card.id} className={index % 2 === 0 ? 'bg-muted/30 border-b-0' : 'bg-card border-b-0'}>
              <TableCell className="py-5">{card.cardId}</TableCell>
              <TableCell className="py-5">{card.balance}</TableCell>
              <TableCell className="py-5">{card.date}</TableCell>
              <TableCell className="py-5 text-center justify-items-center content-center">
                <Image src={`/${card.cardBrand}`} alt={card.cardBrand} width={40} height={25} className='justify-items-center' />
              </TableCell>
              <TableCell className="py-5">{card.cardType}</TableCell>
              <TableCell className="flex items-center gap-2 translate-y-3 py-[9px]">
                <span>{card.cardNumber}</span>
                <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full">
                  {copiedId === card.id ? (
                    <CheckCircle className="text-primary" size={16} />
                  ) : (
                    <Image
                      className="cursor-pointer"
                      src={clipboard}
                      alt='clipboard icon'
                      width={25}
                      height={25}
                      onClick={() => handleCopy(card.fullCardNumber, card.id)}
                    />
                  )}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <span className={`inline-flex items-center justify-center ${getStatusStyles(card.status)}`}>
                  {card.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical className="cursor-pointer inline-block" size={20} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleViewCardTransactions(card.cardId)}>
                      View Card Transactions
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleViewCardDetails(card.cardId)}>
                      View Card Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteCard(card.cardId)} className="flex items-center gap-2 text-destructive">
                      <Trash2 className='text-destructive' size={16} />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Card Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Card Details"
      >
        {error && <p className="text-destructive mb-4 text-sm">{error}</p>}
        {cardDetails ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className={`inline-flex items-center justify-center text-[13px] font-semibold w-[93px] h-[30px] py-2 px-3 ${getModalStatusStyles(cardDetails.status)}`}>
                {cardDetails.status}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Amount Limit</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.amountLimit}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Available Balance</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.availableBalance}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Usage Limit</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.usageLimit}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Status</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.status === 'Active' ? 'Card - Active' : cardDetails.status}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Expiration</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.expiration}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Expiration Date</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.expirationDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Card Type</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.cardType}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Card Brand</p>
                <div className="flex items-center">
                  <Image
                    src={`/${cardDetails.cardBrand.toLowerCase()}.png`}
                    alt={cardDetails.cardBrand}
                    width={40}
                    height={25}
                  />
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Physical</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.physical}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Lodged</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.physical === 'No' ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Date Created</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.dateCreated}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Purchase Type</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.purchaseType}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Card Class</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.cardClass}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Mask PAN</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.maskedPan}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Sequence Number</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.sequenceNumber}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Card ID</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.cardId}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Lifetime Window</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.lifetimeWindow}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Card GUID</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.cardGuid}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Payee</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.lifetimeWindow}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Order Number</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.orderNumber}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Cancelled</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.cancelled}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Cancelled Date</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.cancelledDate || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Terminated</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.terminated}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Terminated Date</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.terminatedDate || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Blocked By</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.blockedBy || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Deactivation Date</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.deactivationDate || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Mid Whitelist</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.midWhitelist || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Mid Blacklist</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.midWhitelist || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Customer Blacklist</p>
                <p className="text-sm font-semibold text-card-foreground">{cardDetails.customerBlacklist}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-card-foreground">Loading...</p>
        )}
      </Modal>
    </>
  );
};