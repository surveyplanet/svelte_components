export default `
<script>
import { Breadcrumbs } from '@surveyplanet/svelte_components';

const breadcrumbs = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

</script>


<Breadcrumbs {breadcrumbs} />
`;
