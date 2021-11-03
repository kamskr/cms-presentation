import React, { Component } from "react";
import axios from "axios";

class Upload extends Component {
  constructor() {
    super();

    this.state = {
      images: [],
      files: [],
    };
  }

  //   componentDidMount() {
  //     axios.get(`http://localhost:1337/upload/files`).then((res) => {
  //       this.setState(res.data);
  //       console.log(res.data);
  //     });
  //   }

  componentDidMount() {
    this.loadFiles();
  }

  async loadFiles() {
    axios.get(`http://localhost:1337/upload/files`).then((res) => {
      this.setState({ files: res.data });
      console.log(res.data);
    });
  }

  onImageChange = (event) => {
    console.log(event.target.files);

    this.setState({
      images: event.target.files,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Array.from(this.state.images).forEach((image) => {
      formData.append("files", image);
    });

    axios
      .post(`http://localhost:1337/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const files = this.state.files;
    return (
      <div className="App">
        <div className="restaurant-name">
          <h1>Files + {files.length}</h1>
          <br />
          <div>
            {files.map((file) => {
              return (
                <>
                  <div key={file.url}>
                    <span>{file.name}</span>
                    <a href={file.url} style={{ color: "green" }}>
                      <strong>{" => "}Open</strong>
                    </a>
                  </div>
                  <br />
                </>
              );
            })}
          </div>
        </div>
        <br />
        <br />
        <br />
        <h2 className="restaurant-name">Upload file</h2>
        <form onSubmit={this.onSubmit} className="restaurant-name">
          <input
            type="file"
            name="files"
            onChange={this.onImageChange}
            alt="image"
          />
          <br />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default Upload;
