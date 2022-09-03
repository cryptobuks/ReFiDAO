import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
} from 'react-share';
import { Copy } from '../icons/copy';
import { Instagram } from '../icons/brands/instagram';
import { Twitter } from '../icons/brands/twitter';
import { Facebook } from '../icons/brands/facebook';
import { Telegram } from '../icons/brands/telegram';
import Button from '@/components/ui/button';
import { useModal } from '@/components/modal-views/context';
import InputLabel from '@/components/ui/input-label';
import Input from '@/components/ui/forms/input';

interface Props {
  nftSlug?: string;
}
export default function CreateView({ nftSlug = '#' }: Props) {
  const nftUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}`;
  let [copyButtonStatus, setCopyButtonStatus] = useState('Copy');
  let [_, copyToClipboard] = useCopyToClipboard();
  const { view, isOpen, closeModal } = useModal();
  const handleCopyToClipboard = () => {
    copyToClipboard(nftUrl);
    setCopyButtonStatus('Copied!');
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 1000);
  };
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pt-5 pb-7 dark:border-gray-700 dark:bg-light-dark sm:px-16 sm:pb-8 sm:pt-6">
      <div className="text-lg font-medium uppercase -tracking-wide text-gray-900 ltr:text-left rtl:text-right dark:text-white lg:text-xl">
        Add new member
      </div>
      <div className="gap-2 pt-4 md:gap-2.5 xl:pt-5">
        <div className="mb-8">
          <InputLabel title="Address" important />
          <Input
            type="text"
            placeholder="Enter member address 0x00000"
            inputClassName="spin-button-hidden"
          />
        </div>
          <Button shape="rounded" color="gray" onClick={closeModal}>Cancel</Button>
          <Button shape="rounded" onClick={closeModal} color="info">CREATE</Button>
      </div>
    </div>
  );
}
