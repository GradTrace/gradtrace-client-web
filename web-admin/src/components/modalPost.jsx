import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ModalPost(props) {
  const { showModalPost, onHide } = props;
  // const dispatch = useDispatch();
  // const submit = (e) => {
  //   e.preventDefault();
  //   console.log(edit, "<<<<ini dari submit");
  //   dispatch(
  //     editExam({
  //       UAS: edit.UAS,
  //       UTS: edit.UTS,
  //       UL1: edit.UL1,
  //       UL2: edit.UL2,
  //     })
  //   );

  //   onHide();
  // };
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModalPost}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Edit Student Data Here
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div class="field">
            <label className="label">Nilai UTS</label>
            <input
              class="form-control"
              placeholder="Nilai UTS"
              name="UTS"
              // value={edit.UTS.score}
              // onChange={(e) => {
              //   setEdit({
              //     ...edit,
              //     UTS: {
              //       score: e.target.value,
              //       id: edit.UTS.id,
              //     },
              //   });
              // }}
            />
          </div>
          <div class="field">
            <label className="label">Nilai UAS</label>
            <input
              class="form-control"
              placeholder="Nilai UAS"
              name="UAS"
              // value={edit.UAS.score}
              // onChange={(e) => {
              //   setEdit({
              //     ...edit,
              //     UAS: {
              //       score: e.target.value,
              //       id: edit.UAS.id,
              //     },
              //   });
              // }}
            />
          </div>
          <div class="field">
            <label className="label">Nilai Ulangan 1</label>
            <input
              class="form-control"
              placeholder="Nilai UL1"
              name="UL1"
              // value={edit.UL1.score}
              // onChange={(e) => {
              //   setEdit({
              //     ...edit,
              //     UL1: {
              //       score: e.target.value,
              //       id: edit.UL1.id,
              //     },
              //   });
              // }}
            />
          </div>
          <div class="field">
            <label className="label">Nilai Ulangan 2</label>
            <input
              class="form-control"
              placeholder="Nilai UL2"
              name="UL2"
              // value={edit.UL2.score}
              // onChange={(e) => {
              //   setEdit({
              //     ...edit,
              //     UL2: {
              //       score: e.target.value,
              //       id: edit.UL2.id,
              //     },
              //   });
              // }}
            />
          </div>
          <div className="field">
            <button type="submit" class="button is-success">
              Submit
            </button>
            <button class="button">Cancel</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
