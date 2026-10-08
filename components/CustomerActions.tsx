'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, MoreVertical } from 'lucide-react';
import verified from '@/public/verified-icon.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CardCustomer,
  CustomerActionsProps,
} from '@/types/types';
import {
  fetchCustomerDetails,
  addToPnd,
  deleteCustomer,
  updateCustomer,
} from '@/lib/api';
import Image from 'next/image';
import clipboard from '@/public/clipboard-icon.png';
import { Modal } from './Modal'; // Assuming the Modal component is in the same directory

export const CustomerActions = ({
  customer,
  tableType,
  onCustomerUpdate,
}: CustomerActionsProps) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [customerDetails, setCustomerDetails] = useState<any>(null);
  const [editFormData, setEditFormData] = useState<Partial<CardCustomer>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleView = async () => {
    const details = await fetchCustomerDetails(customer.id);
    setCustomerDetails(details);
    setIsViewModalOpen(true);
  };

  const handleEdit = () => {
    setEditFormData({
      customerName: customerDetails?.customerName,
      email: customerDetails?.email,
      phoneNo: customerDetails?.phoneNumber,
      country: customerDetails?.country,
    });
    setIsViewModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    await updateCustomer(customer.id, editFormData);
    setIsEditModalOpen(false);
    onCustomerUpdate();
  };

  const handleAddToPnd = async () => {
    await addToPnd(customer.id);
    onCustomerUpdate();
  };

  const handleDelete = async () => {
    await deleteCustomer(customer.id);
    setIsDeleteConfirmOpen(false);
    onCustomerUpdate();
  };

  const getStatusTag = () => {
    if (tableType === 'verified') {
      return (
        <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded">
          Verified
          <Image src={verified} alt="verified icon" width={16} height={16} />
        </span>
      );
    } else if (tableType === 'unverified') {
      return (
        <span className="inline-flex items-center gap-1 bg-muted text-muted-foreground px-2 py-1 rounded">
          Unverified
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 bg-muted text-muted-foreground px-2 py-1 rounded">
          Post-No-Debit
        </span>
      );
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="cursor-pointer inline-block" size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleView}>View</DropdownMenuItem>
          <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
          {tableType !== 'pnd' && (
            <DropdownMenuItem onClick={handleAddToPnd}>
              Add to No-Debit
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setIsDeleteConfirmOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Customer Profile"
      >
        {customerDetails && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-xl">
                  {customerDetails.customerName
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    {customerDetails.customerName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{getStatusTag()}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Joined on {customerDetails.joinDate}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8 place-items-start">
              <div>
                <p className="text-[14px] font-medium text-muted-foreground mb-1 text-left">
                  Email
                </p>
                <p className="text-[14px] text-card-foreground">
                  {customerDetails.email}
                </p>
              </div>
              <div>
                <p className="text-[14px] font-medium text-muted-foreground mb-1">
                  Date of Birth
                </p>
                <p className="text-[14px] text-card-foreground text-left">
                  {customerDetails.dateOfBirth}
                </p>
              </div>
              <div>
                <p className="text-[14px] font-medium text-muted-foreground mb-1">
                  Gender
                </p>
                <div className="flex items-center gap-2">
                  <div className="bg-[#FF5F00] font-semibold text-[12px] text-white w-[31px] h-[31px] flex items-center justify-center rounded-full">
                    {customerDetails.gender}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[14px] font-medium text-muted-foreground mb-1 text-left">
                  User ID
                </p>
                <p className="text-[14px] text-card-foreground">
                  {customerDetails.userId}
                </p>
              </div>
              <div>
                <p className="text-[14px] font-medium text-muted-foreground mb-1 text-left">
                  Phone Number
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-[14px] text-card-foreground">
                    {customerDetails.phoneNumber}
                  </p>
                  <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full">
                    {copiedId === 'phone' ? (
                      <CheckCircle className="text-primary" size={16} />
                    ) : (
                      <Image
                        className="cursor-pointer"
                        src={clipboard}
                        alt="copy icon"
                        width={25}
                        height={25}
                        onClick={() =>
                          handleCopy(customerDetails.phoneNumber, 'phone')
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[14px] font-medium text-muted-foreground mb-1 text-left">
                  Country
                </p>
                <p className="text-[14px] text-card-foreground">
                  {customerDetails.country}
                </p>
              </div>
              <div>
                <p className="text-[14px] font-medium text-muted-foreground mb-1 text-left">
                  Unique ID
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-[14px] text-card-foreground">
                    {customerDetails.uniqueId}
                  </p>
                  <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full">
                    {copiedId === 'uniqueId' ? (
                      <CheckCircle className="text-primary" size={16} />
                    ) : (
                      <Image
                        className="cursor-pointer"
                        src={clipboard}
                        alt="copy icon"
                        width={25}
                        height={25}
                        onClick={() =>
                          handleCopy(customerDetails.uniqueId, 'uniqueId')
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[14px] font-medium text-muted-foreground mb-1 text-left">
                  Issued Bank Account
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-[14px] text-card-foreground">
                    {customerDetails.bankAccount}
                  </p>
                  <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full">
                    {copiedId === 'bankAccount' ? (
                      <CheckCircle className="text-primary" size={16} />
                    ) : (
                      <Image
                        className="cursor-pointer"
                        src={clipboard}
                        alt="copy icon"
                        width={25}
                        height={25}
                        onClick={() =>
                          handleCopy(customerDetails.bankAccount, 'bankAccount')
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[14px] font-medium text-muted-foreground mb-1 text-left">
                  Bank Name
                </p>
                <p className="text-[14px] text-card-foreground">
                  {customerDetails.bankName}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Customer"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="customerName">Name</Label>
            <Input
              id="customerName"
              value={editFormData.customerName || ''}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  customerName: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={editFormData.email || ''}
              onChange={(e) =>
                setEditFormData({ ...editFormData, email: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="phoneNo">Phone Number</Label>
            <Input
              id="phoneNo"
              value={editFormData.phoneNo || ''}
              onChange={(e) =>
                setEditFormData({ ...editFormData, phoneNo: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={editFormData.country || ''}
              onChange={(e) =>
                setEditFormData({ ...editFormData, country: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>Save</Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        title="Confirm Deletion"
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to delete this customer? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
