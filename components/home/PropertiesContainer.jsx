import PropertiesList from './PropertyList';

import LoadingCards from '../card/LoadingCards';

function PropertiesContainer({ property , loading }) {

  if (loading === true) {
    return (
      <>
      <LoadingCards/>
     
      </>
    );
  }

  return <PropertiesList properties={property} />;
}

export default PropertiesContainer;
