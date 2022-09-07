import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import { useState } from 'react';
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard';
import Layout from '@/layouts/_layout';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { Copy } from '@/components/icons/copy';
import { Check } from '@/components/icons/check';
import AuthorInformation from '@/components/author/author-information';
import ProposalTab from '@/components/proposal/proposal-tab';
import Avatar from '@/components/ui/avatar';
import routes from '@/config/routes';
import { useRouter } from 'next/router';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import VoteList from '@/components/vote/vote-list';
import { ExportIcon } from '@/components/icons/export-icon';
import { getVotesByStatus } from '@/data/static/vote-data';

// static data
import { authorData } from '@/data/static/author';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const ProposalsPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const router = useRouter();
  const { totalVote: totalActiveVote } = getVotesByStatus('active');
  const { totalVote: totalOffChainVote } = getVotesByStatus('off-chain');
  const { totalVote: totalExecutableVote } = getVotesByStatus('executable');
  const { totalVote: totalPastVote } = getVotesByStatus('past');
  let [copyButtonStatus, setCopyButtonStatus] = useState(false);
  let [_, copyToClipboard] = useCopyToClipboard();
  const handleCopyToClipboard = () => {
    copyToClipboard(authorData.wallet_key);
    setCopyButtonStatus(true);
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  };

  function goToProposals() {
    setTimeout(() => {
      router.push(routes.proposals);
    }, 200);
  }
  function goToCreateProposalPage() {
    setTimeout(() => {
      router.push(routes.createProposal);
    }, 200);
  }
  function goToTreasury() {
    setTimeout(() => {
      router.push(routes.treasury);
    }, 200);
  }
  function goToAbout() {
    setTimeout(() => {
      router.push(routes.about);
    }, 200);
  }
  function goToSettings() {
    setTimeout(() => {
      router.push(routes.settings);
    }, 200);
  }
  return (
    <>
      <NextSeo
        title="Proposals"
        description="RefiDao proposals"
      />
      <div className="mx-auto mt-12">
        <div className="grid sm:pt-5 2xl:grid-cols-[280px_minmax(auto,_1fr)] 4xl:grid-cols-[320px_minmax(auto,_1fr)] ">
          {/* Left */}
          <div className="rounded-lg border-2 border-gray-200 bg-white p-5 dark:border-gray-200 dark:bg-light-dark">
            <Avatar
              size="lg"
              image={authorData?.avatar?.thumbnail}
              alt="Author"
              className="z-10 mx-auto"
            />
            {/* Profile Info */}
            <div className="flex w-full flex-col md:flex-row lg:flex-row mt-4">
              <div className="shrink-0 border-dashed border-gray-200 dark:border-gray-700 md:w-72 ltr:md:border-r md:ltr:pr-7 rtl:md:border-l md:rtl:pl-7 lg:ltr:pr-10 lg:rtl:pl-10 xl:ltr:pr-14 xl:rtl:pl-14 2xl:w-80 3xl:w-96 3xl:ltr:pr-16 3xl:rtl:pl-16">
                <div className="text-center ltr:md:text-left rtl:md:text-right">
                  {/* Name */}
                  <h2 className="text-xl font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl text-center">
                    {authorData?.name}
                  </h2>
                  <div className="text-center">
                    <div className="mb-1.5 text-lg tracking-tighter text-gray-600 dark:text-white">
                      {authorData?.following} Members
                    </div>
                  </div>
                  {/* User ID and Address */}
                  <div className="mt-5 inline-flex h-9 items-center rounded-full bg-white shadow-card dark:bg-light-dark xl:mt-6 text-center">
                    <div className="inline-flex h-full shrink-0 grow-0 items-center rounded-full bg-blue2 px-4 text-xs text-white sm:text-sm truncate text-ellipsis sm:w-40 sm:text-sm">
                      #{authorData?.wallet_key}
                    </div>
                    <div
                      className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                      title="Copy Address"
                      onClick={handleCopyToClipboard}
                    >
                      {copyButtonStatus ? (
                        <Check className="h-auto w-3.5 text-green-500" />
                      ) : (
                        <Copy className="h-auto w-3.5" />
                      )}
                    </div>
                  </div>
                  {/* Submenu */}
                  <div className="mt-5 text-left">
                    <AnchorLink href="#" onClick={() => goToProposals()}>
                      <div className="mb-1.5 text-lg font-medium tracking-tighter text-gray-500 dark:text-white">
                        Proposals
                      </div>
                    </AnchorLink>
                    <AnchorLink href="#" onClick={() => goToCreateProposalPage()}>
                      <div className="mb-1.5 text-lg font-medium tracking-tighter text-gray-500 dark:text-white">
                        New proposal
                      </div>
                    </AnchorLink>
                    <AnchorLink href="#" onClick={() => goToTreasury()}>
                      <div className="mb-1.5 text-lg font-medium tracking-tighter text-gray-500 dark:text-white">
                        Treasury
                      </div>
                    </AnchorLink>
                    <AnchorLink href="#" onClick={() => goToAbout()}>
                      <div className="mb-1.5 text-lg font-medium tracking-tighter text-gray-500 dark:text-white">
                        About
                      </div>
                    </AnchorLink>
                    <AnchorLink href="#" onClick={() => goToSettings()}>
                      <div className="mb-1.5 text-lg font-medium tracking-tighter text-gray-500 dark:text-white">
                        Settings
                      </div>
                    </AnchorLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="2xl:ltr:pl-10 2xl:rtl:pr-10 4xl:ltr:pl-12 4xl:rtl:pr-12">
            <ParamTab
                  tabMenu={[
                    {
                      title: (
                        <>
                          Active{' '}
                          {totalActiveVote > 0 && (
                            <span className="ltr:ml-0.5 rtl:mr-0.5 ltr:md:ml-1.5 rtl:md:mr-1.5 ltr:lg:ml-2 rtl:lg:mr-2">
                              {totalActiveVote}
                            </span>
                          )}
                        </>
                      ),
                      path: 'active',
                    },
                    {
                      title: (
                        <>
                          Past{' '}
                          {totalPastVote > 0 && (
                            <span className="ltr:ml-0.5 rtl:mr-0.5 ltr:md:ml-1.5 rtl:md:mr-1.5 ltr:lg:ml-2 rtl:lg:mr-2">
                              {totalPastVote}
                            </span>
                          )}
                        </>
                      ),
                      path: 'past',
                    },
                  ]}
                >
                  <TabPanel className="focus:outline-none">
                    <VoteList voteStatus={'active'} />
                  </TabPanel>
                  <TabPanel className="focus:outline-none">
                    <VoteList voteStatus={'past'} />
                  </TabPanel>
                </ParamTab>
          </div>
        </div>
      </div>
    </>
  );
};

ProposalsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ProposalsPage;
