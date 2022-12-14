import { ReactElement, useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { deleteFines, fetchAdminFinesList, IFinesList } from "../http/finesApi";
import { useAuthContext } from "../contexts";
import { FinesElem } from "../components/FinesElem";

export const AdminFines = (): ReactElement => {
  const [finesList, setFinesList] = useState<Array<IFinesList>>([]);

  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      fetchAdminFinesList(token).then((data) => setFinesList(data.data));
    }
  }, [token]);

  const onDelete = useCallback(
    async (id: number) => {
      if (finesList && finesList.length !== 0) {
        await deleteFines({ id }, token);
        setFinesList(
          (prev) => prev?.filter((curr) => curr.fine_id !== id) || []
        );
      }
    },
    [finesList, token]
  );

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
          <FinesElem
            onDelete={() => onDelete(fines.fine_id)}
            key={fines.fine_id}
            fines={fines}
          />
        ))}
    </Container>
  );
};
