# ObesisProject

<div>
  <h2>웹 기획안</h2>
  <p><a href="https://gitmind.com/app/docs/mxhwghmp">웹 기획안 gitmind 링크</a></p>
  
</div>

<div>
  <h2>동작 과정</h2>
  <p><a href="https://broken-slouch-ba7.notion.site/6e23449348474c1abb5e4a17a99e76ca?v=020e9bfdfbc04967801e0e53c5a73adb">백엔드 accounts(계정관련) 노션 링크</a></p>
  <p><a href="https://broken-slouch-ba7.notion.site/bb6cf71f333243bc92a46f4d9048d73c?v=d46359ab679b4ea3aedf92581d135cf3">백엔드 notice(게시글관련) 노션 링크</a></p>
  <p><a href="https://broken-slouch-ba7.notion.site/702e3e7d96b34263b8b04968ca68004d?v=8be2735ffb2145feb05acac0ed70de06">프론트엔드 React 노션 링크</a></p>
  
<div>

<div>
  <h2>매뉴얼</h2>
  <p>
    프로젝트 구동을 위해서 Django를 필요로 하므로 ANACONDA를 설치해야합니다. <a href="https://www.anaconda.com/products/distribution">아나콘다 설치 링크</a><br/>
    아나콘다를 설치하였다면 환경변수를 지정해야 합니다. <a href="https://developer-mistive.tistory.com/42">환경변수 설정 링크</a><br/> 
    conda create --name [가상환경 이름] python 으로 가상환경을 만든다음 conda activate [가상환경 이름]으로 접속합니다.
    git clone으로 받은 프로젝트 폴더에서 backend 디렉토리로 이동후 python manage.py migrate를 통해 마이그레이트 해준다음 python.manage.py runserver로 서버를 구동합니다.
    
    그 다음에는 Node.js를 설치하고 yarn을 설치한다음 git clone으로 받은 frontend의 node_modules을 생성하여 yarn start로 구동합니다.
  </p>
  
  
</div>

