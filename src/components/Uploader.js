import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import deepExtend from 'deep-extend';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import {Cropper} from 'react-image-cropper';

class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: '',
            savedImage: '',
            imageCropValues: '',
            modalIsOpen: false,
            uploading: false,
            uploadButtonText: 'Upload new image'
        }
    }

    uploadImage (imageFileHandle) {
        // Replace code to upload a image file to API and get new URL.
        return Promise.resolve("https://www.minoan.it/images/en/offerte/big/minoan-lines-offers-discount-youngsters-students-big.jpg");
    }

    handleClear () {
        var clearSuccess = true;
        // Add code to send clear request to API and get success flag.

        if (clearSuccess) {
            this.setState({
                imgSrc: '',
                savedImage: '',
            });
        }
    }

    openModal () {
        this.setState({
            modalIsOpen: true
        });
    }
    
    closeModal () {
        this.setState({
            modalIsOpen: false
        });
    }

    async handleFileChanged (event) {
        var fileHandle = event.target.files[0];
        this.setState({
            uploading: true,
            uploadButtonText: 'Uploading...'
        })
        if (fileHandle.size > 1024 * 1024) {
            window.alert('The file size is too big!')
        }
        else {
            var uploadedImageURL = await this.uploadImage();
            this.setState({
                imgSrc: uploadedImageURL,
                savedImage: uploadedImageURL
            });
            this.openModal();
        }
        this.setState({
            uploading: false,
            uploadButtonText: 'Upload new image'
        });
    }

    handleCropValueChange (values) {
        this.setState({
            imageCropValues: values
        });
    }

    handleEdit () {
        this.openModal();
    }

    handleSave () {
        var croppedImageURL = '';
        
        // Add code to send crop params to API and get new URL.
        //croppedImageURL = Promise.resolve("https://braavos.me/images/posts/gr/8.jpg");

        //Remove below line after integrating API.
        croppedImageURL = this.cropper.crop();

        this.setState({
            savedImage: croppedImageURL
        })
        
        this.closeModal();

        return croppedImageURL;
    }

    handleCancel () {
        this.closeModal();
    }

    handlePrint () {
        var winPrint = window.open('', '', 'left=0,top=0,width=1024,height=768,toolbar=0,scrollbars=0,status=0');
        winPrint.document.body.appendChild(this.savedImgContainerRef.cloneNode(true));
        
        // winPrint.document.close();
        // winPrint.focus();
        // winPrint.print();
        // winPrint.close(); 
    }
    
    render() {
        return (
            <div style={styles.container}>
                <input type="file" id="file" type="file" accept="image/*" ref="imageSelector" onClick={(event) => {event.target.value = null}} onChange={(event) => this.handleFileChanged(event)} style={{display: "none"}}/>
                <div style={styles.buttonPanel}>
                    <button style={styles.button} disabled={this.state.uploading} onClick={() => this.refs.imageSelector.click()}>
                        Upload new image
                    </button>
                    <button style={styles.button} disabled={!this.state.imgSrc || this.state.imgSrc.length == 0} onClick={() => this.handleEdit()}>
                        Edit
                    </button>
                    <button style={styles.button} disabled={!this.state.savedImage || this.state.savedImage.length == 0} onClick={() => this.handleClear()}>
                        Clear
                    </button>
                    <button style={styles.button} disabled={!this.state.savedImage || this.state.savedImage.length == 0} onClick={() => this.handlePrint()}>
                        Print Preview
                    </button>
                </div>
                <div
                    style={styles.savedImgContainer}
                    ref={ref => { this.savedImgContainerRef = ref }}
                >
                {
                    (!this.state.imgSrc || this.state.imgSrc.length == 0) ?
                    <div>
                        <h1>Please upload new image</h1>
                    </div>
                    :
                    <img
                        id="savedImg"
                        src={this.state.savedImage}
                        alt=""
                        style={styles.image}
                    />
                }
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() => this.closeModal()}
                    style={styles.modal}
                    contentLabel="Crop"
                    appElement={document.getElementById("root")}
                >
                    <div
                        style={styles.cropperContainer}
                    >
                        <Cropper
                            src={this.state.imgSrc}
                            width={400}
                            height={300}
                            originX={0}
                            originY={0}
                            fixedRatio={false}
                            allowNewSelection={false}
                            onChange={(values) => this.handleCropValueChange(values)}
                            styles={{
                                source_img: {
                                    WebkitFilter: 'blur(3.5px)',
                                    filter: 'blur(3.5px)'
                                },
                                modal: {
                                    opacity: 0.5,
                                    backgroundColor: '#fff'
                                },
                                dotInner: {
                                    borderColor: '#ff0000'
                                },
                                dotInnerCenterVertical: {
                                    backgroundColor: '#ff0000'
                                },
                                dotInnerCenterHorizontal: {
                                    backgroundColor: '#ff0000'
                                }
                            }}
                            ref={ref => { this.cropper = ref }}
                        />
                    </div>
                    <div style={styles.buttonPanel}>
                        <button style={styles.button} onClick={() => this.handleSave()}>
                            Save
                        </button>
                        <button style={styles.button} onClick={() => this.handleCancel()}>
                            Cancel
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}

const styles = {
    container: {
        'margin': '20px'
    },
    buttonPanel: {
        'marginTop': '20px',
        'marginBottom': '20px',
        'textAlign': 'center'
    },
    savedImgContainer: {
        textAlign: 'center'
    },
    button: {
        'width': '150px',
        'height': '30px',
        'marginLeft': '20px',
        'marginRight': '20px'
    },
    image: {
        
    },
    modal: {
        content:{
            'position': 'absolute',
            'top': '50%',
            'left': '50%',
            'right': 'auto',
            'bottom': 'auto',
            'width': '1000px',
            'height': 'auto',
            'transform': 'translate(-50%, -50%)'
        }
    },
    cropperContainer: {
    }
}

export default Uploader;