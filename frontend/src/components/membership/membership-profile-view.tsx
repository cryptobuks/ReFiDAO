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
import Textarea from '@/components/ui/forms/textarea';

interface Props {
  nftSlug?: string;
}
export default function MembershipProfileView({ nftSlug = '#' }: Props) {
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
        Membership View
      </div>
      <div className="gap-2 pt-4 md:gap-2.5 xl:pt-5">
      <div className="mb-8 ">
          <InputLabel title="Address" />
            <div className="text-sm leading-6 tracking-tighter text-gray-600 dark:text-gray-400">
            @0x9Af568442868356c7aE834A4
            </div>
        </div>
        <div className="mb-8 ">
          <InputLabel title="Title" important />
            <div className="text-sm leading-6 tracking-tighter text-gray-600 dark:text-gray-400">
            Hi i am Steve
            </div>
        </div>
        <div className="mb-8 border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
          <InputLabel
            title="Description" important
            subTitle="The description why you want to join our membership."
          />
            <div className="text-sm leading-6 tracking-tighter text-gray-600 dark:text-gray-400">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            </div>
        </div>
        <div className="mb-8">
            <div>
                <div className="mb-1.5 text-lg font-medium tracking-tighter text-gray-900 dark:text-white">
                    1
                </div>
                <div className="text-sm tracking-tighter text-gray-600 dark:text-gray-400">
                  Whitelist
                </div>
              </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2.5 xs:mt-8">
          <Button shape="rounded" color="gray" onClick={closeModal}>Decline</Button>
          <Button shape="rounded" onClick={closeModal} color="primary">Whitelist</Button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2.5 xs:mt-8">
          <Button shape="rounded" color="success" onClick={closeModal}>Pay Membership</Button>
        </div>
      </div>
    </div>
  );
}
