import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export default function ReusableModal() {
  return function EditModal(props) {
    const { handleClose, handleShow } = props;
    //   const [add, setAdd] = useState({
    //     description: "",
    //     CourseId: "",
    //     deadline: "",
    //     name: "",
    //     className: "",
    //   });
    //   const added = (e) => {
    //     e.preventDefault();
    //     // console.log(add);
    //     dispatch(
    //       addingAssignment({
    //         description: add.description,
    //         CourseId: add.CourseId,
    //         deadline: add.deadline,
    //         name: add.name,
    //         className: add.className,
    //       })
    //     ).then(() => {
    //       navigate("/nilaiTugas");
    //       dispatch(setShow(false));
    //     });
    //   };

    return (
      <>
        <Modal show={handleShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Assignment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div class="field">
                <label className="label">Description</label>
                <input
                  name="description"
                  // onChange={(e) => {
                  //   setAdd({
                  //     ...add,
                  //     description: e.target.value,
                  //   });
                  // }}
                  class="form-control"
                  placeholder="Enter Description"
                />
              </div>

              <div className="field">
                <div className="div mt-2">
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    className="m-2"
                    variant="primary"
                    // onClick={handleClose}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          </Modal.Body>
          {/* <Modal.Footer></Modal.Footer> */}
        </Modal>
      </>
    );
  };
}
