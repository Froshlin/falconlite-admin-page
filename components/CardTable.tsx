'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
} from "@/components/ui/dropdown-menu";
import { Modal } from '@/components/Modal';
import { fetchCardDetails, deleteCard } from '@/lib/api';

export const CardTable = ({ cards, currentPage, itemsPerPage, onDeleteCard }: CardTableProps) => {
  const router = useRouter();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCards = cards.slice(startIndex, startIndex + itemsPerPage);
  const [copiedId, setCopiedId] = useState<string | null>(null);
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
            <TableRow key={card.id} className={index % 2 === 0 ? 'bg-[#F8FCFF] border-b-0' : 'bg-[#FFFFFF] border-b-0'}>
              <TableCell className="py-5">{card.cardId}</TableCell>
              <TableCell className="py-5">{card.balance}</TableCell>
              <TableCell className="py-5">{card.date}</TableCell>
              <TableCell className="py-5 text-center justify-items-center content-center">
                <Image src={`/${card.cardBrand}`} alt={card.cardBrand} width={40} height={25} className='justify-items-center' />
              </TableCell>
              <TableCell className="py-5">{card.cardType}</TableCell>
              <TableCell className="flex items-center gap-2 translate-y-3 py-[9px]">
                <span>{card.cardNumber}</span>
                <div className="flex items-center justify-center w-6 h-6 bg-[#E6F0FA] rounded-full">
                  {copiedId === card.id ? (
                    <CheckCircle className="text-[#36C6F3]" size={16} />
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
                    <DropdownMenuItem onClick={() => handleDeleteCard(card.cardId)} className="flex items-center gap-2 text-[#E82828]">
                      <Trash2 className='text-[#E82828]' size={16} /> 
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
        {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
        {cardDetails ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className={`inline-flex items-center justify-center text-[13px] font-semibold w-[93px] h-[30px] py-2 px-3 ${getModalStatusStyles(cardDetails.status)}`}>
                {cardDetails.status}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Amount Limit</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.amountLimit}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Available Balance</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.availableBalance}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Usage Limit</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.usageLimit}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Status</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.status === 'Active' ? 'Card - Active' : cardDetails.status}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Expiration</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.expiration}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Expiration Date</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.expirationDate}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Card Type</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.cardType}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Card Brand</p>
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
                <p className="text-xs text-[#6B7280] uppercase">Physical</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.physical}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Lodged</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.physical === 'No' ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Date Created</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.dateCreated}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Purchase Type</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.purchaseType}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Card Class</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.cardClass}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Mask PAN</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.maskedPan}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Sequence Number</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.sequenceNumber}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Card ID</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.cardId}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Lifetime Window</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.lifetimeWindow}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Card GUID</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.cardGuid}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Payee</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.lifetimeWindow}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Order Number</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.orderNumber}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Cancelled</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.cancelled}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Cancelled Date</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.cancelledDate || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Terminated</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.terminated}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Terminated Date</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.terminatedDate || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Blocked By</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.blockedBy || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Deactivation Date</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.deactivationDate || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Mid Whitelist</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.midWhitelist || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Mid Blacklist</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.midWhitelist || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase">Customer Blacklist</p>
                <p className="text-sm font-semibold text-[#0A0E3F]">{cardDetails.customerBlacklist}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[#0A0E3F]">Loading...</p>
        )}
      </Modal>
    </>
  );
};