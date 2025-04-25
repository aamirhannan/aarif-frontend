import { ClipLoader, BeatLoader, BarLoader } from "react-spinners";

import './page-loader.scss';
const PageLoader = () => {
    return (
        <div className="page-loader-container">
            <ClipLoader color="#622ac2" loading={true} size={50} />
        </div>
    );
};

export default PageLoader;
