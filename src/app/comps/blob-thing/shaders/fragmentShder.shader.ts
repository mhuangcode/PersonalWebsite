export default `
varying vec3 vNormal;
#include <packing>

void main() {
 gl_FragColor = vec4( packNormalToRGB( vNormal), 1. );
}
` as string;
