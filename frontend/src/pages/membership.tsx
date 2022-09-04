import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import Layout from '@/layouts/_layout';
import type { NextPageWithLayout } from '@/types';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import ComparisonChart from '@/components/ui/chats/comparison-chart';
import Avatar from '@/components/ui/avatar';
import OverviewChart from '@/components/ui/chats/overview-chart';
import TopPools from '@/components/ui/top-pools';
import MembershipTable from '@/components/membership/membership-table';
import WalletCard from '@/components/ui/wallet-card';
import TransactCoin from '@/components/ui/transact-coin';
import PriceFeedSlider from '@/components/ui/live-price-feed';
import { priceFeedData } from '@/data/static/price-feed';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';

//images
import AuthorImage from '@/assets/images/author.jpg';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const topPoolsLimit = (breakpoint: string) => {
  switch (breakpoint) {
    case 'md':
      return 5;
    case '2xl':
      return 5;
    default:
      return 4;
  }
};

const HomePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const [limit, setLimit] = useState(4);
  const breakpoint = useBreakpoint();

  useEffect(() => {
    setLimit(topPoolsLimit(breakpoint));
  }, [breakpoint]);

  return (
    <>
      <NextSeo
        title="RefiDAO Membership"
        description="RefiDAO Membership"
      />
      <div className="mx-auto w-full max-w-[1160px] text-sm md:pt-6 4xl:pt-8">
          <div className="md:col-span-2 lg:col-span-full xl:col-start-1 xl:col-end-9 xl:row-start-2 xl:row-end-3 2xl:col-start-1 2xl:col-end-10 2xl:row-start-2 2xl:row-end-3 3xl:col-span-9 3xl:row-start-2 3xl:row-end-3">
            <MembershipTable />
          </div>
      </div>
    </>
  );
};

HomePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
