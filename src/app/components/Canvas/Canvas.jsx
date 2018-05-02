
import React from 'react';
import { actionsCreator as aCsources } from '../../actions/sources';

class Canvas extends React.PureComponent {
    static defaultProps = {
        images: [],
        page: 0
    }
    componentDidMount() {
        const { images, page } = this.props;
        this.renderCanvas(images, page);
    }
    componentDidUpdate() {
        const { images, page } = this.props;
        this.renderCanvas(images, page);
    }
    renderCanvas(images, page) {
        console.log(images);
        if (!images || !page) return;
        const ctx = this.canvas.getContext("2d");
        let w, h;
        for (let index = 0; index < images.length; index++) {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                if (index === 0) {
                    w = img.naturalWidth;
                    h = img.naturalHeight;
                    this.canvas.width = img.naturalWidth;
                    this.canvas.height = img.naturalHeight;
                    this.canvas.style.width = '1000px';
                    this.canvas.style.height = 1000 / w * h + 'px';
                }

                ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
            }
            const image = images[index];
            if (/^data:/.test(image)) {
                img.src = image;
            } else {
                img.src = aCsources.download(image, page);
            }
        }
    }
    render() {
        return (
            <React.Fragment>
                <canvas className="document" ref={(el) => this.canvas = el} />
            </React.Fragment>
        );
    }
}

export default Canvas;
