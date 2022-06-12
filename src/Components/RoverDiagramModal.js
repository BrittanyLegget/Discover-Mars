import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Rover Diagram Modal
export default function RoverDiagramModal(props) {
  const diagram = props.diagram;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ fontFamily: "Titillium Web" }}
        >
          Rover Equipment Diagram
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={diagram} alt="" width="600" class="center" />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={props.onHide}
          style={{
            backgroundColor: "#000",
            borderColor: "#CC6A4F",
            fontFamily: "Titillium Web",
            color: "#CC6A4F",
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
