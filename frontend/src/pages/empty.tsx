import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import Layout from '@/layouts/_layout';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import ErrorLightImage from '@/assets/images/404-light.svg';
import ErrorDarkImage from '@/assets/images/404-dark.svg';

const EmptyPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title="Empty"
        description="Empty"
      />
    </>
  );
};

EmptyPage.getLayout = function getLayout(page) {
  return (
    <Layout contentClassName="flex items-center justify-center">
      {page}
    </Layout>
  );
};

export default EmptyPage;
