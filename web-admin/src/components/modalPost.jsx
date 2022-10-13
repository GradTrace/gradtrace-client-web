import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { editExam } from "../store/actions/actionExam";
import { Url } from "./Url";

export default function ModalPost(props) {
  const { showModalPost, onHide, idiPost } = props;
  console.log(showModalPost, "<<< modal post component");
  const [formAdd, setFormAdd] = useState({
    UTS: { score: "", ExamId: 0, StudentId: idiPost.id },
    UAS: { score: "", ExamId: 0, StudentId: idiPost.id },
    UL1: { score: "", ExamId: 0, StudentId: idiPost.id },
    UL2: { score: "", ExamId: 0, StudentId: idiPost.id },
  });

  useEffect(() => {
    console.log("masuk use effect depan");
    if (idiPost.id !== 0 && showModalPost) {
      fetch(`${Url}teachers/exams/${idiPost.className}`, {
        method: "get",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something Error Fetch assignmentn");
          }
          return response.json();
        })
        .then((data) => {
          let newEdit = {};
          data.findExamId.forEach((e) => {
            if (e.name === "UAS") {
              newEdit.UAS = {
                ...formAdd.UAS,
                ExamId: e.id,
                StudentId: idiPost.id,
              };
            } else if (e.name === "UTS") {
              newEdit.UTS = {
                ...formAdd.UTS,
                ExamId: e.id,
                StudentId: idiPost.id,
              };
            } else if (e.name === "Ulangan 1") {
              newEdit.UL1 = {
                ...formAdd.UL1,
                ExamId: e.id,
                StudentId: idiPost.id,
              };
            } else if (e.name === "Ulangan 2") {
              newEdit.UL2 = {
                ...formAdd.UL2,
                ExamId: e.id,
                StudentId: idiPost.id,
              };
            }
          });
          console.log(newEdit, "<<<>>>>>", data);
          setFormAdd(newEdit);
        });
    }
  }, [idiPost, showModalPost]);

  console.log(formAdd, "ini terakhir formadd");
  const dispatch = useDispatch();
  const submit = (e) => {
    e.preventDefault();
    dispatch(
      editExam({
        UAS: formAdd.UAS,
        UTS: formAdd.UTS,
        UL1: formAdd.UL1,
        UL2: formAdd.UL2,
      })
    );

    onHide();
  };

  const addHandler = (e) => {
    const { name, value } = e.target;
    setFormAdd({
      ...formAdd,
      [name]: value,
    });
  };

  console.log(formAdd, "data setelah di submit");
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
          Add Student Score Here
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submit}>
          <div class="field">
            <label className="label">Nilai UTS</label>
            <input
              class="form-control"
              placeholder="Nilai UTS"
              name="UTS"
              value={formAdd.UTS.score}
              onChange={(e) => {
                setFormAdd({
                  ...formAdd,
                  UTS: {
                    ...formAdd.UTS,
                    score: e.target.value,
                  },
                });
              }}
            />
          </div>
          <div class="field">
            <label className="label">Nilai UAS</label>
            <input
              class="form-control"
              placeholder="Nilai UAS"
              name="UAS"
              value={formAdd.UAS.score}
              onChange={(e) => {
                setFormAdd({
                  ...formAdd,
                  UAS: {
                    ...formAdd.UAS,
                    score: e.target.value,
                  },
                });
              }}
            />
          </div>
          <div class="field">
            <label className="label">Nilai Ulangan 1</label>
            <input
              class="form-control"
              placeholder="Nilai UL1"
              name="UL1"
              value={formAdd.UL1.score}
              onChange={(e) => {
                setFormAdd({
                  ...formAdd,
                  UL1: {
                    ...formAdd.UL1,
                    score: e.target.value,
                  },
                });
              }}
            />
          </div>
          <div class="field">
            <label className="label">Nilai Ulangan 2</label>
            <input
              class="form-control"
              placeholder="Nilai UL2"
              name="UL2"
              value={formAdd.UL2.score}
              onChange={(e) => {
                setFormAdd({
                  ...formAdd,
                  UL2: {
                    ...formAdd.UL2,
                    score: e.target.value,
                  },
                });
              }}
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
