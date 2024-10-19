export default function MapPopup({ onClose }) {
  return (
    <div
      className="m-pop"
      style={{
        position: "static",
        top: "180px",
        left: "320px",
        display: "flex",
        fontSize: "14px",
        boxShadow: "5px 5px 5px #00000040",
        borderRadius: "10px",
        width: "400px",
        height: "100px",
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        padding: "5px",
      }}
    >
      <div className="info-box" style={{ marginLeft: "10px" }}>
        <p style={{ marginBottom: "7px" }}>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            티맵 모빌리티
          </span>
          <a
            href="/"
            target="_blank"
            style={{ color: "#3D6DCC", fontSize: "13px", marginLeft: "10px" }}
          >
            홈페이지
          </a>
        </p>
        <p>
          <span className="new-addr">서울 중구 삼일대로 343 (우)04538</span>
        </p>
        <p>
          <span className="old-addr" style={{ color: "#707070" }}>
            (지번) 저동1가 114
          </span>
        </p>
      </div>
      <button
        // onClick={onClose}
        className="btn"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "15px",
          height: "15px",
        }}
      >
        닫기
      </button>
    </div>
  );
}
