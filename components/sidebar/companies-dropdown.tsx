import {Dropdown, Text} from '@nextui-org/react';
import React, {useState} from 'react';
import {AcmeIcon} from '../icons/acme-icon';
import {AcmeLogo} from '../icons/acmelogo';
import {BottomIcon} from '../icons/sidebar/bottom-icon';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';

interface Company {
   name: string;
   location: string;
   logo: React.ReactNode;
}

export const CompaniesDropdown = () => {
   const [company, setCompany] = useState<Company>({
      name: 'Pri Modas',
      location: 'Amparo, SP',
      logo: <AcmeIcon />,
   });
   return (
      <Dropdown placement="bottom-right" borderWeight={'extrabold'}>
         <Dropdown.Trigger css={{cursor: 'pointer'}}>
            <Box>
               <Flex align={'center'} css={{gap: '$7'}}>
               <AcmeIcon />
                  <Box>
                     <Text
                        h3
                        size={'$xl'}
                        weight={'medium'}
                        css={{
                           m: 0,
                           color: '$accents9',
                           lineHeight: '$lg',
                           mb: '-$5',
                        }}
                     >
                        {company.name}
                     </Text>
                     <Text
                        span
                        weight={'medium'}
                        size={'$xs'}
                        css={{color: '$accents8'}}
                     >
                        {company.location}
                     </Text>
                  </Box>
                  <BottomIcon />
               </Flex>
            </Box>
         </Dropdown.Trigger>
         <Dropdown.Menu
            aria-label="Avatar Actions"
            css={{
               '$$dropdownMenuWidth': '340px',
               '$$dropdownItemHeight': '60px',
               '& .nextui-dropdown-item': {
                  'py': '$2',
                  // dropdown item left icon
                  'svg': {
                     color: '$secondary',
                     mr: '$4',
                  },
                  // dropdown item title
                  '& .nextui-dropdown-item-content': {
                     w: '100%',
                     fontWeight: '$semibold',
                  },
               },
            }}
         >
            <Dropdown.Section title="Empresas">
               <Dropdown.Item
                  key="1"
                  icon={<AcmeIcon />}
                  description="Amparo, SP"
               >
                  Pri Modas
               </Dropdown.Item>
            </Dropdown.Section>
         </Dropdown.Menu>
      </Dropdown>
   );
};
