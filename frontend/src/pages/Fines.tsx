import { ReactElement, useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { deleteFines, fetchFinesList, IFinesList } from "../http/finesApi";
import { useAuthContext } from "../contexts";
import { FinesItem } from "../components/FinesItem";

export const Fines = (): ReactElement => {
  const [finesList, setFinesList] = useState<Array<IFinesList>>([]);

  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      fetchFinesList(token).then((data) => setFinesList(data.data));
    }
  }, [token]);


  return (
    <Container
      style={{
        background: "lightgray",
        width: 1100,
        padding: 20,
        marginTop: 50,
      }}
    >
      <div className="d-flex mx-auto mt-5 justify-content-center align-items-center ">
        <h2>Fines list</h2>
      </div>

      {finesList &&
        finesList?.map((fines) => (
          <FinesItem
            key={fines.fine_id}
            fines={fines}
          />
        ))}
    </Container>
  );
};
