t=open('template.html').read()
t=t.replace('/*ENGINE*/',open('engine.js').read()).replace('/*UI*/',open('ui.js').read()).replace('/*ASSETS*/',open('assets.js').read()).replace('/*STADIUM*/',open('stadium.js').read()).replace('/*BUILDER*/',open('builder.js').read()).replace('/*SEASON*/',open('season.js').read()).replace('/*V3*/',open('three3d.js').read()).replace('/*FAKE*/',open('fakelogos.js').read()).replace('/*LIVE*/',open('live.js').read()+'\n'+open('announce.js').read()).replace('/*THREE*/',open('/home/claude/gridiron/vendor/three.min.js').read())
open('index.html','w').write(t)

# ---- embed fonts so the game looks identical offline (downloaded file) ----
import base64,re,glob,os
def _fontcss():
    css=[]
    for f in sorted(glob.glob(os.path.join(os.path.dirname(os.path.abspath(__file__)),'vendor/fonts/*.woff2'))):
        n=os.path.basename(f);fam,_,w,_=n.split('-')[0],n.split('-')[1],n.split('-')[2],None
        name={'oswald':'Oswald','graduate':'Graduate','cinzel':'Cinzel','inter':'Inter'}[fam]
        d=base64.b64encode(open(f,'rb').read()).decode()
        css.append("@font-face{font-family:'%s';font-style:normal;font-weight:%s;font-display:swap;src:url(data:font/woff2;base64,%s) format('woff2')}"%(name,w,d))
    return '<style>'+''.join(css)+'</style>'
FONTCSS=_fontcss()
_p=os.path.join(os.path.dirname(os.path.abspath(__file__)),'index.html')
_h=open(_p).read()
_h=re.sub(r'<link href="https://fonts\.googleapis\.com[^>]*>',lambda m:FONTCSS,_h,count=1)
open(_p,'w').write(_h)
