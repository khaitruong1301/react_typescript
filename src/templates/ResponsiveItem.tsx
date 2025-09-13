import React, { useEffect, useState } from 'react'

type Props = {
    component: React.FC // (props) => jsx
    mobileComponent?: React.FC
    tabletComponent?: React.FC
} 
// <ResponsiveItem component={<TenComponent />}>  {component}
//<ResponsiveItem component={TenComponent}>  => <component /> 


const ResponsiveItem = (props: Props) => {
   const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const handleChangeWidth = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('load', handleChangeWidth);
        window.addEventListener('resize', handleChangeWidth);
        return () => {
            //unmount component
            window.removeEventListener('resize', handleChangeWidth);
            window.removeEventListener('load', handleChangeWidth);
        };
    }, [screenWidth]);

    let Component = props.component;

    if (screenWidth < 768 && props.mobileComponent) {
        Component = props.mobileComponent;
    }

    return (
        <Component />
    )
}

export default ResponsiveItem
