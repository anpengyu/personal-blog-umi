import React from 'react';

export default function Layout(props: any, userInfo: any) {
  return React.Children.map(props.children, child => {
    return React.cloneElement(child, { userInfo });
  });
}
