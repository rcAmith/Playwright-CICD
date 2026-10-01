pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    parameters {
        booleanParam(
            name: 'DOCKER_RUN',
            defaultValue: true,
            description: 'Run typecheck, API tests, and UI regression suite inside Docker container'
        )
    }

    environment {
        CI = 'true'
        HEADLESS = 'true'

        LOGIN_EMAIL     = credentials('automation-login-email')
        LOGIN_PASSWORD  = credentials('automation-login-password')
        LOGIN_USER_NAME = credentials('automation-login-user-name')

        DOCKER_IMAGE = "playwright-e2e-tests:${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            when {
                expression {
                    !params.DOCKER_RUN
                }
            }

            steps {
                sh 'npm ci'
            }
        }

        stage('Run Test Pipeline') {
            steps {
                script {

                    if (params.DOCKER_RUN) {

                        sh '''
                            set +e

                            echo "Building Docker image: $DOCKER_IMAGE"
                            docker build -t "$DOCKER_IMAGE" .

                            echo "Running test pipeline inside Docker container..."

                            docker run --rm \
                                -e CI="$CI" \
                                -e HEADLESS="$HEADLESS" \
                                -e LOGIN_EMAIL="$LOGIN_EMAIL" \
                                -e LOGIN_PASSWORD="$LOGIN_PASSWORD" \
                                -e LOGIN_USER_NAME="$LOGIN_USER_NAME" \
                                -v "$PWD/reports:/app/reports" \
                                -v "$PWD/test-results:/app/test-results" \
                                -v "$PWD/allure-results:/app/allure-results" \
                                -v "$PWD/allure-report:/app/allure-report" \
                                "$DOCKER_IMAGE" \
                                sh -c '
                                    set +e

                                    echo "===== TYPECHECK ====="
                                    npm run typecheck
                                    TYPECHECK_EXIT=$?

                                    echo "===== API TESTS ====="
                                    npm run test:api
                                    API_EXIT=$?

                                    echo "===== UI TESTS ====="
                                    npm run test:ui
                                    UI_EXIT=$?

                                    echo "===== GENERATING ALLURE REPORT ====="
                                    npm run allure:generate
                                    ALLURE_EXIT=$?

                                    echo "===== TEST SUMMARY ====="
                                    echo "Typecheck exit code: $TYPECHECK_EXIT"
                                    echo "API tests exit code: $API_EXIT"
                                    echo "UI tests exit code: $UI_EXIT"
                                    echo "Allure generation exit code: $ALLURE_EXIT"

                                    if [ $TYPECHECK_EXIT -ne 0 ] || \
                                       [ $API_EXIT -ne 0 ] || \
                                       [ $UI_EXIT -ne 0 ]; then
                                        exit 1
                                    fi

                                    exit 0
                                '

                            DOCKER_EXIT=$?

                            echo "Docker test pipeline exit code: $DOCKER_EXIT"

                            exit $DOCKER_EXIT
                        '''

                    } else {

                        sh '''
                            set +e

                            echo "Running test pipeline locally on Jenkins agent..."

                            echo "===== TYPECHECK ====="
                            npm run typecheck
                            TYPECHECK_EXIT=$?

                            echo "===== API TESTS ====="
                            npm run test:api
                            API_EXIT=$?

                            echo "===== UI TESTS ====="
                            npm run test:ui
                            UI_EXIT=$?

                            echo "===== GENERATING ALLURE REPORT ====="
                            npm run allure:generate
                            ALLURE_EXIT=$?

                            echo "===== TEST SUMMARY ====="
                            echo "Typecheck exit code: $TYPECHECK_EXIT"
                            echo "API tests exit code: $API_EXIT"
                            echo "UI tests exit code: $UI_EXIT"
                            echo "Allure generation exit code: $ALLURE_EXIT"

                            if [ $TYPECHECK_EXIT -ne 0 ] || \
                               [ $API_EXIT -ne 0 ] || \
                               [ $UI_EXIT -ne 0 ]; then
                                exit 1
                            fi

                            exit 0
                        '''
                    }
                }
            }
        }
    }

    post {

        always {
            echo '===== PUBLISHING TEST RESULTS ====='

            junit(
                testResults: 'reports/junit/junit-results.xml',
                allowEmptyResults: true
            )

            archiveArtifacts(
                artifacts: '''
                    reports/**,
                    test-results/**,
                    allure-report/**,
                    allure-results/**
                ''',
                allowEmptyArchive: true
            )

            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'reports/playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])

            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'allure-report',
                reportFiles: 'index.html',
                reportName: 'Allure Report'
            ])
        }

        success {
            echo 'Playwright test pipeline completed successfully!'
        }

        failure {
            echo 'Playwright test pipeline failed. Check Jenkins test results and published reports.'
        }

        cleanup {
            script {
                if (params.DOCKER_RUN) {
                    sh(
                        script: 'docker rmi "$DOCKER_IMAGE" || true',
                        returnStatus: true
                    )
                }
            }
        }
    }
}