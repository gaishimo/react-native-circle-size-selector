[ignore]
.*/*[.]android.js
<PROJECT_ROOT>/example/.*

[include]

[libs]
external-module-types
node_modules/react-native/Libraries/react-native/react-native-interface.js
node_modules/react-native/flow/

[options]

module.system=haste
munge_underscores=true

module.name_mapper='^[./a-zA-Z0-9$_-]+\.\(bmp\|gif\|jpg\|jpeg\|png\|psd\|svg\|webp\|m4v\|mov\|mp4\|mpeg\|mpg\|webm\|aac\|aiff\|caf\|m4a\|mp3\|wav\|html\|pdf\)$' -> 'RelativeImageStub'

suppress_type=$FlowIssue
suppress_type=$FlowFixMe
suppress_type=$FlowFixMeProps
suppress_type=$FlowFixMeState
suppress_type=$FixMe

suppress_comment=\\(.\\|\n\\)*\\$FlowFixMe\\($\\|[^(]\\|(\\(>=0\\.\\(5[0-6]\\|[1-4][0-9]\\|[0-9]\\).[0-9]\\)? *\\(site=[a-z,_]*react_native[a-z,_]*\\)?)\\)
suppress_comment=\\(.\\|\n\\)*\\$FlowIssue\\((\\(>=0\\.\\(5[0-6]\\|[1-4][0-9]\\|[0-9]\\).[0-9]\\)? *\\(site=[a-z,_]*react_native[a-z,_]*\\)?)\\)?:? #[0-9]+
suppress_comment=\\(.\\|\n\\)*\\$FlowFixedInNextDeploy
suppress_comment=\\(.\\|\n\\)*\\$FlowExpectedError

unsafe.enable_getters_and_setters=true

[version]
^0.57.0
