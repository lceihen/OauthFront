

current_datetime=$(date '+%Y-%m-%d %H:%M:%S')


length=${#CI_COMMIT_MESSAGE}


no_spaces_message="${CI_COMMIT_MESSAGE:0:length-1}"


href="https://${APP}-${GIT_BRANCH}.abclive.cloud"


context="{
  \"msg_type\": \"post\",
  \"content\": {
    \"post\": {
      \"zh-CN\": {
        \"title\": \"CICD信息\",
        \"content\": [
          [
            {
              \"tag\": \"text\",
              \"text\": \"发布仓库：$CI_PROJECT_NAME\n\"
            },
            {
              \"tag\": \"text\",
              \"text\": \"发布分支：$CI_COMMIT_REF_NAME\n\"
            },
            {
              \"tag\": \"text\",
              \"text\": \"发布时间：$current_datetime\n\"
            },
               {
              \"tag\": \"text\",
              \"text\": \"发布信息：$no_spaces_message\n\"
            },
            {
              \"tag\": \"a\",
              \"text\": \"发布地址：$href\",
              \"href\": \"$href\"
            }
          ]
        ]
      }
    }
  }
}"

echo $context
curl -X POST \
  $CICD_HOOK_URL \
  -H 'Content-Type: application/json' \
  -d "$context"
