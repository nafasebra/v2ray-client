import { useQuery } from '@tanstack/react-query';

export type buttonType = {
  icon: string;
  text: string;
  background: string;
  iconColor: string;
  textColor: string;
};

export const fetchHeaderButton = async () => {
  const res = await fetch('https://beta-patrick-stats.ilyagvc.online/PatrickStats/api/FrontEnd/apps.json');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();
  // const dataButton = {
  //     android: [{
  //       name: "V2rayNG",
  //       link: "https://github.com/2dust/v2rayNG/releases/download/1.8.9/v2rayNG_1.8.9.apk"
  //     }],
  //     iOS: [{
  //       name: "FoXray",
  //       link: "https://apps.apple.com/us/app/foxray/id6448898396" 
  //     }, {
  //       name: "V2Box",
  //       link: "https://apps.apple.com/us/app/v2box-v2ray-client/id6446814690"
  //     }],
  //     Windows: [{
  //       name: "V2rayN",
  //       link: "https://github.com/2dust/v2rayN/releases/download/6.23/v2rayN.zip"
  //     }],
  //     MacOS: [{
  //       name: "V2Box",
  //       link: "https://apps.apple.com/us/app/v2box-v2ray-client/id6446814690"
  //     }, {
  //       name: "FoXray",
  //       link: "https://apps.apple.com/us/app/foxray/id6448898396"
  //     }]
  // };
  // const dataButton = {
  //     android: [{
  //       name: "V2rayNG",
  //       link: "value"
  //     }],
  //     iOS: [{
  //       name: "FoXray",
  //       link: "value 
  //     }, {
  //       name: "V2Box",
  //       link: "value"
  //     }],
  //     Windows: [{
  //       name: "V2rayN",
  //       link: "value"
  //     }],
  //     MacOS: [{
  //       name: "V2Box",
  //       link: "value"
  //     }, {
  //       name: "FoXray",
  //       link: "value"
  //     }]
  // };
  return dataButton;
};

export const useHeaderButton = () => {
  return useQuery({ queryKey: ['headerButton'], queryFn: fetchHeaderButton });
};