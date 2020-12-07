//#region PACKAGE IMPORTS
import React, { useCallback, useEffect, useState } from 'react';
//#endregion

//#region MODULE IMPORTS
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import SearchInput from '../../components/Input/SearchInput';
import DropdownInput from '../../components/Input/DropdownInput';
//#endregion

//#region MODULE IMPORTS
import ProductCard from '../../components/ProductCard';
//#endregion

//#region STYLESHEET IMPORTS
import './FurnitureList.style.scss';
import { fetchFurnitureProducts } from '../../config/api-service/furnitureList';
import LoadingSpinner from '../../components/LoadingSpinner';
//#endregion

const FurnitureListPage = () => {
  //#region STATE
  const [furnitureList, setFurnitureList] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [chosenFurnitureStyles, setChosenFurnitureStyles] = useState([]);
  const [chosenDeliveryTimes, setChosenDeliveryTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //#endregion

  //#region API CALL
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    const { data } = await fetchFurnitureProducts();
    setFurnitureList(data);
    setIsLoading(false);
  }, []);
  //#endregion

  //#region LIFECYCLE
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  //#endregion

  //#region HANDLER
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleChooseFurnitureStyles = (selectedStyle) => {
    if (chosenFurnitureStyles.indexOf(selectedStyle) === -1) {
      setChosenFurnitureStyles([...chosenFurnitureStyles, selectedStyle]);
    } else {
      const updatedTypes = chosenFurnitureStyles.filter(
        (style) => style !== selectedStyle
      );
      setChosenFurnitureStyles(updatedTypes);
    }
  };

  const handleChooseDeliveryTimes = (selectedDeliveryTime) => {
    if (chosenDeliveryTimes.indexOf(selectedDeliveryTime) === -1) {
      setChosenDeliveryTimes([...chosenDeliveryTimes, selectedDeliveryTime]);
    } else {
      const updatedTypes = chosenDeliveryTimes.filter(
        (style) => style !== selectedDeliveryTime
      );
      setChosenDeliveryTimes(updatedTypes);
    }
  };

  const handleFilterByFurnitureStyle = (data) => {
    let filteredData = [];
    for (let i = 0; i < data.length; i++) {
      let isPushed = false;
      for (let j = 0; j < chosenFurnitureStyles.length; j++) {
        if (
          !isPushed &&
          data[i].furniture_style.indexOf(chosenFurnitureStyles[j]) !== -1
        ) {
          filteredData.push(data[i]);
          isPushed = true;
        }
      }
    }

    return filteredData.length < 1 ? data : filteredData;
  };

  const handleFilterByDeliveryTime = (data) => {
    const filteredData = [];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < chosenDeliveryTimes.length; j++) {
        const days = Number(data[i].delivery_time);
        const times = {
          '1 Month': () => {
            if (days / 30.417 >= 0.91) filteredData.push(data[i]);
          },
          '1 Week': () => {
            if (days === 7) filteredData.push(data[i]);
          },
          '2 Weeks': () => {
            if (days === 14) filteredData.push(data[i]);
          },
          More: () => {
            if (days / 30.417 >= 1.052) filteredData.push(data[i]);
          },
        };

        times[chosenDeliveryTimes[j]]();
      }
    }

    return filteredData.length < 1 ? data : filteredData;
  };

  const handleFilterBySearch = (data) => {
    const filteredData = [];

    for (let i = 0; i < data.length; i++) {
      const productName = data[i].name.toLowerCase();
      if (productName.indexOf(searchValue.toLowerCase()) !== -1) {
        filteredData.push(data[i]);
      }
    }

    return filteredData.length < 1 ? [] : filteredData;
  };
  //#endregion

  //#region RENDERER
  const renderHeader = () => {
    const dropdownData = [
      'Classic',
      'Midcentury',
      'Scandinavian',
      'Modern',
      'Contemporary',
    ];
    const deliveryTimeData = ['1 Week', '2 Weeks', '1 Month', 'More'];
    return (
      <Header>
        <SearchInput
          value={searchValue}
          placeholder="Search Furniture"
          onChange={handleSearchChange}
          disabled={isLoading}
        />
        <div className="dropdownWrapper">
          <DropdownInput
            className="furnitureStyleDropdown"
            placeholder="Furniture Style"
            onChoose={handleChooseFurnitureStyles}
            chosenData={chosenFurnitureStyles}
            data={dropdownData}
            disabled={isLoading}
          />
          <DropdownInput
            className="deliveryTimesDropdown"
            placeholder="Delivery Times"
            onChoose={handleChooseDeliveryTimes}
            chosenData={chosenDeliveryTimes}
            data={deliveryTimeData}
            disabled={isLoading}
          />
        </div>
      </Header>
    );
  };

  const renderFurnitureList = () => {
    if (isLoading) {
      return;
    }
    const data = handleFilterBySearch(
      handleFilterByDeliveryTime(
        handleFilterByFurnitureStyle(furnitureList.products)
      )
    );
    return data.length < 1 ? (
      <span className="noDataMessage">No Data</span>
    ) : (
      data.map((product, i) => (
        <ProductCard
          key={`${product.name}-${i}`}
          className="furnitureProductCard"
          name={product.name}
          description={product.description}
          price={product.price}
          furnitureStyles={product.furniture_style}
          deliveryTime={product.delivery_time}
        />
      ))
    );
  };
  //#endregion

  return (
    <Layout>
      {renderHeader()}
      <div className="cardList">
        {isLoading ? <LoadingSpinner /> : renderFurnitureList()}
      </div>
    </Layout>
  );
};

export default FurnitureListPage;
