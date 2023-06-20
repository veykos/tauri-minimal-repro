import path, { dirname} from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
    DIST_DIR: path.resolve(__dirname, '..', 'dist'),
    SRC_DIR: path.resolve(__dirname, '..', 'src'),
    ROOT_DIR: path.resolve(__dirname, '..'),
}