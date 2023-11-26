import { QRCode } from "react-qrcode-logo";

type PropType = {
  valueQrCode: string;
};

function QRCodeContainer({ valueQrCode }: PropType) {
  return (
    <div className="gradient rounded-lg flex items-center justify-center">
      <QRCode
        value={valueQrCode}
        ecLevel="L"
        size={200}
        bgColor="transparent"
        eyeRadius={[
          {
            // top/left eye
            outer: [10, 10, 0, 10],
            inner: [0, 10, 10, 10],
          },
          [10, 10, 10, 0], // top/right eye
          [10, 0, 10, 10], // bottom/left
        ]}
        id="qrcode"
      />
    </div>
  );
}

export default QRCodeContainer;
