'use client';

import {useEffect,useRef,useState} from 'react';
import type * as THREE from 'three';
import styles from './GameWheel.module.css';

const DISC = '/images/wheel/disc.webp';
const FRAME = '/images/wheel/frame.webp';
const DURATION = 2400;

/** Presentation only: the parent owns random selection, target angle and result. */
export default function GameWheel({rotation,busy,result}:{rotation:number;busy:boolean;result:string}) {
 const host = useRef<HTMLDivElement>(null);
 const target = useRef(rotation);
 const animate = useRef<(()=>void)|null>(null);
 const [ready,setReady] = useState(false);
 target.current = rotation;

 useEffect(()=>{
  let disposed=false;
  let cleanup=()=>{};
  async function mount(){
   const T = await import('three');
   if(disposed || !host.current) return;
   let renderer:THREE.WebGLRenderer;
   try { renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'}); }
   catch { return; } // The image version stays usable when WebGL is unavailable.
   const container=host.current;
   renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
   renderer.setClearColor(0x000000,0);
   renderer.outputColorSpace=T.SRGBColorSpace;
   container.appendChild(renderer.domElement);
   const scene=new T.Scene();
   const camera=new T.OrthographicCamera(-.5,.5,.5,-.5,.1,10);
   camera.position.z=2;
   const geometry=new T.PlaneGeometry(.8,.8);
   const material=new T.MeshBasicMaterial({transparent:true,depthWrite:false,toneMapped:false});
   const disc=new T.Mesh(geometry,material);
   // Image centre matches the opening in the stationary frame (45.5% from top).
   disc.position.y=.045;
   disc.rotation.z=-target.current*Math.PI/180;
   scene.add(disc);
   const glowGeometry=new T.RingGeometry(.327,.359,96,1,Math.PI/2-Math.PI/10,Math.PI/5);
   const glowMaterial=new T.MeshBasicMaterial({color:0xc6f5ff,transparent:true,opacity:0,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide});
   const glow=new T.Mesh(glowGeometry,glowMaterial);
   glow.position.set(0,.045,.02);scene.add(glow);
   const positions=new Float32Array(24*3);
   for(let i=0;i<24;i++){const a=i*2.399963;const r=.25+(i%5)*.026;positions[i*3]=Math.cos(a)*r;positions[i*3+1]=Math.sin(a)*r+.045;positions[i*3+2]=.03;}
   const particlesGeometry=new T.BufferGeometry();particlesGeometry.setAttribute('position',new T.BufferAttribute(positions,3));
   const particlesMaterial=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:{strength:{value:0}},vertexShader:'void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);gl_PointSize=7.0;}',fragmentShader:'uniform float strength; void main(){float d=length(gl_PointCoord-0.5)*2.0;float a=pow(max(0.0,1.0-d),2.0)*strength;gl_FragColor=vec4(0.45,0.85,1.0,a);}'});
   const particles=new T.Points(particlesGeometry,particlesMaterial);scene.add(particles);
   let raf=0,angle=target.current,from=angle,to=angle,start=0;
   const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
   const draw=()=>renderer.render(scene,camera);
   const resize=()=>{const size=container.clientWidth;renderer.setSize(size,size);draw();};
   const observer=new ResizeObserver(resize);observer.observe(container);resize();
   const tick=(now:number)=>{
    const elapsed=now-start;
    const progress=Math.min(elapsed/DURATION,1);
    // Five turns with an inertial, continuous ease-out; exact parent target at rest.
    angle=from+(to-from)*(1-Math.pow(1-progress,4));
    disc.rotation.z=-angle*Math.PI/180;
    const charge=Math.sin(Math.min(elapsed/350,1)*Math.PI)*.012;
    disc.scale.setScalar(1+charge);
    const celebration=progress===1?Math.max(0,1-(elapsed-DURATION)/700):0;
    glowMaterial.opacity=celebration*.5;
    particlesMaterial.uniforms.strength.value=progress<1?Math.sin(progress*Math.PI)*.5:celebration;
    particles.rotation.z=elapsed*.00012;
    draw();
    if(elapsed<DURATION+700)raf=requestAnimationFrame(tick);
   };
   const spin=()=>{
    cancelAnimationFrame(raf);from=angle;to=target.current;start=performance.now();
    if(motion.matches){angle=to;disc.rotation.z=-to*Math.PI/180;disc.scale.setScalar(1);glowMaterial.opacity=0;particlesMaterial.uniforms.strength.value=0;draw();}
    else raf=requestAnimationFrame(tick);
   };
   animate.current=spin;
   const onMotion=()=>{if(motion.matches)spin();};motion.addEventListener('change',onMotion);
   const onLost=(event:Event)=>{event.preventDefault();cancelAnimationFrame(raf);setReady(false);};
   const onRestored=()=>{draw();setReady(true);};
   renderer.domElement.addEventListener('webglcontextlost',onLost);
   renderer.domElement.addEventListener('webglcontextrestored',onRestored);
   let texture:THREE.Texture|undefined;
   new T.TextureLoader().load(DISC,loaded=>{
    if(disposed){loaded.dispose();return;}
    texture=loaded;texture.colorSpace=T.SRGBColorSpace;material.map=texture;material.needsUpdate=true;
    disc.rotation.z=-target.current*Math.PI/180;angle=target.current;draw();setReady(true);
   },undefined,()=>setReady(false));
   cleanup=()=>{cancelAnimationFrame(raf);animate.current=null;observer.disconnect();motion.removeEventListener('change',onMotion);renderer.domElement.removeEventListener('webglcontextlost',onLost);renderer.domElement.removeEventListener('webglcontextrestored',onRestored);geometry.dispose();material.dispose();texture?.dispose();glowGeometry.dispose();glowMaterial.dispose();particlesGeometry.dispose();particlesMaterial.dispose();renderer.dispose();renderer.domElement.remove();};
  }
  mount().catch(()=>{if(!disposed)setReady(false);});
  return ()=>{disposed=true;cleanup();};
 },[]);

 useEffect(()=>{animate.current?.();},[rotation]);

 return <div className={`${styles.stage} ${busy?styles.busy:''} ${result?styles.won:''}`} aria-hidden="true">
  <div className={styles.fallback} style={{visibility:ready?'hidden':'visible'}}><img src={DISC} alt="" draggable={false} style={{transform:`rotate(${rotation}deg)`}}/></div>
  <div className={styles.canvas} ref={host} style={{visibility:ready?'visible':'hidden'}}/>
  <img className={styles.frame} src={FRAME} alt="" draggable={false}/>
  <span className={styles.star}>✦</span><span className={styles.star}>✧</span>
 </div>;
}
