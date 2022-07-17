import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Container, Tab } from '@mui/material';
import { useRouter } from 'next/router';
import { ContainerSpacingBottom } from '../../components/Container';
import { AppPage } from '../../components/Page/AppPage';
import { PrivateMainLayout } from '../../Layout/PrivateMainLayout';
import { Messages } from '../../lib/messages';
import { urlQueryService } from '../../lib/url-query.service';
import { OrderTab } from '../../modules/Order/Tabs/OrderTab';
import { NextPageWithLayout } from '../../types/components.type';
import { EOrderStatus } from '../../types/enums';

const Page: NextPageWithLayout = () => {
  const router = useRouter();

  const queryOptions = { query: router.query };

  const routerOptions = { router };

  const tab =
    (urlQueryService.getOne('tab', queryOptions) as EOrderStatus) ||
    EOrderStatus.WaitForPayment;

  const handleChangeTab = (
    event: React.SyntheticEvent,
    newValue: EOrderStatus,
  ) => {
    urlQueryService.replaceUrlQuery({ tab: newValue }, routerOptions);
  };

  return (
    <AppPage
      title={Messages.order.my}
      header={{
        breadcrumbs: [
          {
            title: Messages.order.my,
            icon: faShoppingBag,
          },
        ],
      }}
    >
      <TabContext value={tab}>
        <Container>
          <TabList onChange={handleChangeTab} variant="fullWidth">
            <Tab
              label={Messages.order.waitForPayment}
              value={EOrderStatus.WaitForPayment}
            />
            <Tab label={Messages.order.success} value={EOrderStatus.Success} />
            <Tab label={Messages.order.cancel} value={EOrderStatus.Cancel} />
          </TabList>
        </Container>

        <ContainerSpacingBottom>
          <TabPanel value={EOrderStatus.WaitForPayment} sx={{ pl: 0, pr: 0 }}>
            <OrderTab status={EOrderStatus.WaitForPayment} />
          </TabPanel>

          <TabPanel value={EOrderStatus.Success} sx={{ pl: 0, pr: 0 }}>
            <OrderTab status={EOrderStatus.Success} />
          </TabPanel>

          <TabPanel value={EOrderStatus.Cancel} sx={{ pl: 0, pr: 0 }}>
            <OrderTab status={EOrderStatus.Cancel} />
          </TabPanel>
        </ContainerSpacingBottom>
      </TabContext>
    </AppPage>
  );
};

Page.layout = PrivateMainLayout;

export default Page;
