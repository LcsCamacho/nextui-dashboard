import { Button, Input, Text } from '@nextui-org/react';
import Link from 'next/link';
import { Breadcrumbs, Crumb, CrumbLink } from '../breadcrumb/breadcrumb.styled';
import { ExportIcon } from '../icons/accounts/export-icon';
import { HouseIcon } from '../icons/breadcrumb/house-icon';
import { UsersIcon } from '../icons/breadcrumb/users-icon';
import { Flex } from '../styles/flex';
import { TableWrapper } from '../table/table';
import { AddUser } from './add-user';
import {columns, users} from '../table/data';
import {useState} from 'react';

export const Accounts = () => {
   const [usersState, setUsersState] = useState(users);
   return (
      <Flex
         css={{
            'mt': '$5',
            'px': '$6',
            '@sm': {
               mt: '$10',
               px: '$16',
            },
         }}
         justify={'center'}
         direction={'column'}
      >
         <Breadcrumbs>
            <Crumb>
               <HouseIcon />
               <Link href={'/'}>
                  <CrumbLink href="#">Home</CrumbLink>
               </Link>
               <Text>/</Text>
            </Crumb>

            <Crumb>
               <UsersIcon />
               <CrumbLink href="#">Clientes</CrumbLink>
               <Text>/</Text>
            </Crumb>
            <Crumb>
               <CrumbLink href="#">Lista</CrumbLink>
            </Crumb>
         </Breadcrumbs>

         <Text h3>Todas os clientes</Text>
         <Flex
            css={{gap: '$8'}}
            align={'center'}
            justify={'between'}
            wrap={'wrap'}
         >
            <Flex
               css={{
                  'gap': '$6',
                  'flexWrap': 'wrap',
                  '@sm': {flexWrap: 'nowrap'},
               }}
               align={'center'}
            >
               <Input
                  css={{width: '100%', maxW: '410px'}}
                  placeholder="Buscar clientes"
                  onChange={(e) => {
                     const value = e.target.value;
                     const filteredUsers = users.filter((user) => {
                        const name = user.name.toLowerCase();
                        const email = user.email.toLowerCase();
                        const search = value.toLowerCase();
                        return (
                           name.includes(search) ||
                           email.includes(search)
                        );
                     });
                     setUsersState(filteredUsers);
                  }}
               />
            </Flex>
            <Flex direction={'row'} css={{gap: '$6'}} wrap={'wrap'}>
               <AddUser />
               <Button auto iconRight={<ExportIcon />}>
                  Exportar para Excel
               </Button>
            </Flex>
         </Flex>

         <TableWrapper users={usersState} />
      </Flex>
   );
};
