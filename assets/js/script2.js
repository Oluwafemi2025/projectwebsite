


  
    (function(){
      const form = document.getElementById('registrationForm');
      const status = document.getElementById('form_status');

       const faculty = document.getElementById('faculty');
      const program = document.getElementById('program');
      const programOptions = Array.from(program.querySelectorAll('option[data-faculty]'));
      faculty.addEventListener('change', () => {
        const f = faculty.value;
        program.value = "";
        programOptions.forEach(opt => {
          opt.hidden = !!(f && opt.getAttribute('data-faculty') !== f);
        });
      });

 
      const showError = (input, message) => {
        const err = document.getElementById(input.id + '_error');
        if(err){ err.textContent = message; err.style.display = 'block'; }
        input.setAttribute('aria-invalid','true');
      };
      const clearError = (input) => {
        const err = document.getElementById(input.id + '_error');
        if(err){ err.textContent = ''; err.style.display = 'none'; }
        input.removeAttribute('aria-invalid');
      };

       form.querySelectorAll('input, select, textarea').forEach(el => {
        el.addEventListener('input', () => {
          clearError(el);
          if(el.checkValidity()){
            if(el.id === 'confirm_password' || el.id === 'password') checkPasswords();
            if(el.type === 'file') validateFiles(el);
          }
        });
        el.addEventListener('blur', () => {


          if(!el.checkValidity()){
            showError(el, el.validationMessage);
          }
        });
      });

 
      function isAtLeast16(dobValue){
        if(!dobValue) return false;
        const dob = new Date(dobValue);
        const today = new Date();
        const sixteen = new Date(dob.getFullYear() + 16, dob.getMonth(), dob.getDate());
        return today >= sixteen;
      }

      function checkDOB(){
        const dob = document.getElementById('dob');
        clearError(dob);
        if(!dob.value){
          showError(dob, 'Please provide your date of birth.');
          return false;
        }
        if(!isAtLeast16(dob.value)){
          showError(dob, 'You must be at least 16 years old to apply.');
          return false;
        }
        return true;
      }

 
 
      const pass = document.getElementById('password');
      const confirmPass = document.getElementById('confirm_password');
      const passOK = document.getElementById('password_ok');

      function checkPasswords(){
        clearError(confirmPass);
        passOK.style.display = 'none';
        if(pass.value.length && confirmPass.value.length){
          if(pass.value !== confirmPass.value){
            showError(confirmPass, 'Passwords do not match.');
            return false;
          } else {
            passOK.textContent = 'Passwords match ✓';
            passOK.style.display = 'block';
            return true;
          }
        }
        return true;
      }

 
      function validateFiles(input){
        clearError(input);
        const file = input.files && input.files[0];
        if(!file) return true;
        if(input.id === 'photo'){
          const okTypes = ['image/jpeg','image/png'];
          if(!okTypes.includes(file.type)) return showError(input, 'Photo must be JPG or PNG.'), false;
          if(file.size > 2*1024*1024) return showError(input, 'Photo must be under 2MB.'), false;
        }
        if(input.id === 'transcript'){
          if(file.type !== 'application/pdf') return showError(input, 'Transcript must be a PDF.'), false;
          if(file.size > 5*1024*1024) return showError(input, 'Transcript must be under 5MB.'), false;
        }
        return true;
      }

 
      form.addEventListener('submit', (e) => {
        status.textContent = '';
        let ok = true;

 
        form.querySelectorAll('[required]').forEach(el => {
          clearError(el);
          if(!el.checkValidity()){
            showError(el, el.validationMessage);
            ok = false;
          }
        });



         if(!checkDOB()) ok = false;
        if(!checkPasswords()) ok = false;
        if(!validateFiles(document.getElementById('photo'))) ok = false;
        if(!validateFiles(document.getElementById('transcript'))) ok = false;

        if(!ok){
          e.preventDefault();
          status.textContent = 'Please fix the highlighted fields.';
          return;
        }
 
        e.preventDefault();
        status.textContent = '✅ Application submitted (demo). Connect to your server to process.';
        form.scrollIntoView({behavior:'smooth', block:'start'});
      });
    })();
 