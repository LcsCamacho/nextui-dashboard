import { useRouter } from 'next/router';
import { AccountsIcon } from '../icons/sidebar/accounts-icon';
import { HomeIcon } from '../icons/sidebar/home-icon';
import { ReportsIcon } from '../icons/sidebar/reports-icon';
import { useSidebarContext } from '../layout/layout-context';
import { Box } from '../styles/box';
import { Flex } from '../styles/flex';
import { CompaniesDropdown } from './companies-dropdown';
import { SidebarItem } from './sidebar-item';
import { SidebarMenu } from './sidebar-menu';
import { Sidebar } from './sidebar.styles';
import { routes } from '../../constants/routes';

export const SidebarWrapper = () => {
   const router = useRouter();
   const {collapsed, setCollapsed} = useSidebarContext();

   return (
      <Box
         as="aside"
         css={{
            height: '100vh',
            zIndex: 202,
            position: 'sticky',
            top: '0',
         }}
      >
         {collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}

         <Sidebar collapsed={collapsed}>
            <Sidebar.Header>
               <CompaniesDropdown />
            </Sidebar.Header>
            <Flex
               direction={'column'}
               justify={'between'}
               css={{height: '100%'}}
            >
               <Sidebar.Body className="body sidebar">
                  <SidebarItem
                     title="Home"
                     icon={<HomeIcon />}
                     isActive={router.pathname === '/'}
                     href={routes.home}
                  />
                  <SidebarMenu title="Menu Principal">
                     <SidebarItem
                        isActive={router.pathname === '/clientes'}
                        title="Clientes"
                        icon={<AccountsIcon />}
                        href={routes.clientes}
                     />
                     <SidebarItem
                        isActive={router.pathname === '/vendas'}
                        title="Vendas"
                        icon={<ReportsIcon />}
                        href={routes.vendas}
                     />
                  </SidebarMenu>

               </Sidebar.Body>
            </Flex>
         </Sidebar>
      </Box>
   );
};
