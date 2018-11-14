import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import nodeExternals from 'webpack-node-externals';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import overrideRules from './lib/overrideRules';
import pkg from '../package.json';

const ROOT_DIR = path.resolve(__dirname, '..');
const resolvePath  = (...args) => path.resolve(ROOT_DIR, ...args);
const SRC_DIR = resolvePath('src');
const BUILD_DIR = resolvePath('build');

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');
const isAnalyze = process.argv.includes('--analyze') || process.argv.includes('--analyse');

const reScript = /\.(js|jsx|mjs)$/;
const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const reImage = /\.(bmp|gif|jpeg|png|svg)$/;
const staticAssetName = isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]';

// 压缩css选项
const minimizeCssOptions = {
		discardComments: {removeAll: true}
};

// 公共打包配置
const config = {
		context: ROOT_DIR,
		mode: isDebug ? 'development' : 'production';
		output: {
				path: resolvePath(BUILD_DIR, 'public/assets'),
				publicPath: '/assets/',
				pathinfo: isVerbose,
				filename: isDebug ? '[name].js' : '[name].[chunkhash:8].js',
				chunFilename: isDebug,
				// 格式化windows系统中的路径
				devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/') 
		},
		// 搜索路径
		resolve: [ 'node_modules', 'src' ],

		module: {

		} 
}

