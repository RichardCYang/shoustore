<main>
    <div class="regItemForm">
        <div class="inputField">
            <label>상품 명</label> 
            <input class="nicknameInput" type="text"/><br/> 
        </div>
        <div class="inputField">
            <label>가격 <label class="koreantag">(숫자만 입력)</label></label> 
            <input type="number" class="priceInput"/><br/> 
        </div>
        <div class="inputField">
            <label>재고 <label class="koreantag">(숫자만 입력)</label></label> 
            <input type="number" class="countInput"/><br/> 
        </div>
        <div class="inputField">
            <label>카테고리</label> 
            <input class="catsInput" type="text"/><br/> 
        </div>
        <div class="inputField" style="height: 180px;">
            <label>상품 설명</label> 
            <textarea class="itemdescView"></textarea><br/> 
        </div>
        <div class="inputField thumbnailInput">
            <label>미리보기 이미지</label>
            <input type="file" accept=".jpg,.jpeg,.png,.gif" class="thumbnailFile" onchange="hook_changed('HOOK_CHANGED_THUMBUPLOAD',this)"/><br/> 
            <div class="thumbnailWrapper">
                <img class="thumbnailView">
            </div>
        </div>
        <div class="inputField">
            <button class="shoustore_default_btn formbutton button_width_fit" onclick="hook_clicked('HOOK_CLICKED_REGITEM')">등록</button>
        </div>
    </div>
</main>