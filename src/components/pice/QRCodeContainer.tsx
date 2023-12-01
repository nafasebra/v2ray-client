import { QRCodeSVG } from "qrcode.react";

type QRCodeContainerProps = {
  valueQrCode: string;
};

function QRCodeContainer({ valueQrCode }: QRCodeContainerProps) {
  return (
    <div className="gradient rounded-lg">
      <div className="relative z-0 aspect-square p-3">
        <QRCodeSVG
          value={valueQrCode}
          size={200}
          className="!w-full !h-full"
          bgColor="transparent"
        />
      </div>
    </div>
  );
}

export default QRCodeContainer;
