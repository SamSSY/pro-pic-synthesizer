import React from 'react';
import { render } from 'react-dom';
import Dropzone from 'react-dropzone';
import Colors from 'material-ui/lib/styles/colors';
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import Cropper from 'cropper';
import './main.scss';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const initialState = {
  files: []
};

class MainBody extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    $('img').on('load', () => {
      console.log('img uploaded.');
      const imgWH = $('#originalImg').css(['width', 'height']);
      console.log(imgWH);
      console.log(imgWH.width);
      console.log(imgWH.height);
      const w = parseInt(imgWH.width, 10);
      const h = parseInt(imgWH.height, 10);
      if (w > h && w > 350) {
        console.log('width > 350px');
        $('#originalImg').css({ 'width': '350px' });
      } else if (w < h && h > 350) {
        console.log('height > 350px');
        $('#originalImg').css({ 'height': '350px' });
      }
      $('#originalImg').cropper({
        autoCropArea: 0.65,
        restore: false,
        guides: false,
        highlight: false,
        cropBoxMovable: false,
        cropBoxResizable: false
      });
    });
  }

  onDrop(files) {
    this.setState({
      files: files
    });
  }

  render() {
    const { files } = this.state;
    const imgStyles = {
      height: '350px',
      width: '350px'
    };
    const textStyles = {
      paddingTop: '40%',
      paddingLeft: '10px',
      paddingRight: '10px',
      fontSize: '30px'
    };
    const containerStyles = {
      height: '100%',
      width: '800px',
      paddingTop: '80px',
      marginLeft: 'auto',
      marginRight: 'auto',
    };
    const dropzoneStyles = {
      height: '350px',
      width: '350px',
      border: '1px dashed',
      margin: '20px',
      display: 'inline-block',
      verticalAlign: 'top',
    };
    const resultzoneStyles = {
      height: '350px',
      width: '350px',
      border: '1px dashed',
      margin: '20px',
      display: 'inline-block'
    };
    const iconStyles = {
      color: '#ffffff',
      margin: '9px',
      fontSize: '30px'
    };
    console.log('render!', files);
    console.log('length', files.length);

    return (
      <div style={{ height: '85%' }}>
        <AppBar title="就博大頭貼產生器"
          iconElementLeft={
            <FontIcon className="material-icons" style={iconStyles} >
              portrait
            </FontIcon>
          }
          style={{ position: 'fixed' }}
        />
        <div style={containerStyles} >
          <Dropzone multiple={false} style={dropzoneStyles} onDrop={this.onDrop.bind(this)}>
            {files.length > 0 ?
              <div style={{ overflowX: 'hidden', overflowY: 'hidden' }} >
                <img id="originalImg" src={files[0].preview} />
              </div> :
              <div style={ textStyles } >
                Try dropping a photo here, or click to select files to upload.
              </div>
            }
          </Dropzone>
          <div style={resultzoneStyles} >
            <img id="resultImg" src={"../asset/background.png"} style={imgStyles} />
          </div>
          <div className="buttonContainer" >
            <RaisedButton
              label="合成"
              secondary={true}
              icon={
                <FontIcon className="material-icons" >
                  transform
                </FontIcon>
              }
            />
            <RaisedButton
              label="下載"
              secondary={true}
              icon={
                <FontIcon className="material-icons" >
                  file_download
                </FontIcon>
              }
            />
          </div>
        </div>
        <div className="footer">
          <small>&copy; Shang-Yu, Su </small>
        </div>
      </div>
    );
  }
}

render(<MainBody />, document.getElementById('root'));
