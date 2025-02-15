// 등록 버튼 클릭 이벤트 처리
let submitButton = document.getElementById('stop'); //등록 버튼 찾기
let tvalue = document.getElementById('postTitle'); //내용 부분 찾기
let alert = document.getElementById('alertText'); //경고문 찾기
alert.style.display = 'none'; //경고문 처음엔 안 보이게

let upload = document.getElementById('upload'); //'사진 업로드 해주세요' 부분 찾기

submitButton.addEventListener('click', function (event) {
  let text = tvalue.value.trim(); // textarea의 텍스트를 가져와서 앞뒤 공백을 제거
  
  if (text.length === 0) {
    // 텍스트가 비어있을 경우 폼 제출 막기
    event.preventDefault(); // 폼 제출을 막기
    // tvalue.style.border = '1px solid #68B1F4';
    // tvalue.style.borderRadius = '10px';
    alert.style.display = 'block';
  }
});

// textarea 요소를 가져오기
const textarea = document.getElementById("editArea");

// 높이를 자동으로 조절하는 함수를 만들기
function autoResize() {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
};

// textarea의 내용이 변경될 때마다 높이를 자동으로 조절
textarea.addEventListener("input", autoResize);

// 페이지 로드 시 초기 높이를 설정
autoResize();

//글자수 세기 js
// textarea 요소와 글자 수를 표시할 div 요소를 가져오기
const textarea_cnt = document.getElementById("editArea");
const charCountDiv = document.getElementById("charCount");

// textarea의 내용이 변경될 때마다 글자 수를 업데이트하는 함수 만들기
function updateCharCount() {
    const text = textarea_cnt.value;
    const charCount = text.length;
    charCountDiv.textContent = `(${charCount} / 150)`;
};

// textarea의 내용이 변경될 때마다 updateCharCount 함수를 호출
textarea_cnt.addEventListener("input", updateCharCount);

// 페이지 로드 시 초기 글자 수를 설정
updateCharCount();

//maxlength가 작동을 안해서... js처리
function maxLengthCheck(object) {
    if (object.value.length > object.maxlength)
       object.value = object.value.slice(0, object.maxlength)
};

// 파일 선택이 완료되었을 때의 이벤트를 처리
const imageInput = document.getElementById('fileInput'); //파일 input 찾기
const file = document.getElementById('fileName'); //파일 이름

fileInput.addEventListener("change", function () {
    upload.style.display = 'none'; //'사진을 업로드 해주세요' 안 보이게

    if (fileInput.files.length > 0) {
        let fileName = fileInput.files[0].name;
        console.log(fileName);
        let imgName = fileName.substring(0, fileName.lastIndexOf('.'));
        let extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length + 1);

        if (imgName.length <= 10) {
        file.textContent = imgName + extension;
        } 
        else {
        let shortenedFileName = fileName.substring(0, 7) + '...' + extension;
        file.textContent = shortenedFileName;
        }

        let image = new Image();
        let select = fileInput.files[0]
        image.src = URL.createObjectURL(select);

        let container = document.querySelector('.container');

        image.onload = function () {
      
        let height = image.height / 4;
        console.log(height);
        container.style.paddingBottom = `${height}px`;
        }
    } 
});

const imageView = document.getElementById('change');
const del = document.getElementById('del');

imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  console.log(file);
  if (file && file.type.startsWith('image/')) {
    imageView.src = URL.createObjectURL(file);
    imageView.style.display = 'block';
    imageView.style.width = '332px';
    imageView.style.border = 'none';
    del.style.display = 'inline-block';
  } 
  // else {
  //   imageView.src = '';
  // }
});

del.addEventListener('click', () => {
    upload.style.display = 'block'; //'사진 업로드해주세요' 보이게
    imageView.src = '';
    file.textContent = '';
    del.style.display = 'none';
    fileInput.value = ''; /*!!!여기!!!*/
    console.log(fileInput.value);
});