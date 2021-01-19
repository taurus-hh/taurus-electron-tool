import { DownLoader } from '@taraus-he/tdunzip';
export async function downloadTemplate() {
  // origin + repo.owner + '/' + repo.name + '/archive/' + repo.checkout + '.zip' github 地址
  // https://github.com/taurus-hh/react-electron-template/archive/master.zip
  const url = "https://courseware-dev-1302600247.cos.ap-beijing.myqcloud.com/jiaoyanyun/master.zip"
  const dl = new DownLoader({
    url,
    destFolder: __dirname,
  });
  return await dl.start();
}
