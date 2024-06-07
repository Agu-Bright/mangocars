import PageLayout from "../components/App/PageLayout";
import successImage from "../assets/successful.png";
const Successful = ({ f7router, f7route }) => {
  const { id } = f7route.params;
  console.log("Successful", id);

  return (
    <PageLayout f7router={f7router}>
      <div className="px-4">
        <div
          style={{
            width: "100%",
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
            paddingTop: "100px",
          }}
        >
          <img src={successImage} alt="successful" />
          <p
            style={{
              paddingTop: "55px",
              fontWeight: "800",
              fontSize: "20px",
            }}
          >
            Payment Successful
          </p>

          <button
            onClick={() => f7router.navigate(`/reciept/${id}`)}
            style={{
              marginTop: "55px",
              border: "none",
              borderRadius: "5px",
              background: "#109324",
              width: "214.11px",
              height: "33.84px",
              color: "white",
            }}
          >
            Print Reciept
          </button>

          <p
            onClick={() => f7router.navigate("/home")}
            style={{ color: "#109324", marginTop: "30px", fontWeight: "500" }}
          >
            Return to Home
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Successful;
