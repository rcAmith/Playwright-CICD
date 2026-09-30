pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
        ansiColor('xterm')
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

        // Jenkins Credentials mappings (Configure these under Manage Jenkins > Credentials)
        BASE_URL        = credentials('automation-base-url')
        LOGIN_EMAIL     = credentials('automation-login-email')
        LOGIN_PASSWORD  = credentials('automation-login-password')
        LOGIN_USER_NAME = credentials('automation-login-user-name')

        DOCKER_IMAGE    = "playwright-e2e-tests:${BUILD_NUMBER}"
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

        stage('Run Full Test Pipeline') {
            steps {
                script {
                    if (params.DOCKER_RUN) {
                        sh '''
                            echo "Building Docker image: $DOCKER_IMAGE"
                            docker build -t "$DOCKER_IMAGE" .

                            echo "Running test pipeline inside Docker container..."
                            docker run --rm \
                                -e CI="$CI" \
                                -e HEADLESS="$HEADLESS" \
                                -e BASE_URL="$BASE_URL" \
                                -e LOGIN_EMAIL="$LOGIN_EMAIL" \
                                -e LOGIN_PASSWORD="$LOGIN_PASSWORD" \
                                -e LOGIN_USER_NAME="$LOGIN_USER_NAME" \
                                -v "$PWD/reports:/app/reports" \
                                -v "$PWD/test-results:/app/test-results" \
                                "$DOCKER_IMAGE" \
                                sh -c "npm run typecheck && npm run test:api && npm run test:ui && npm run allure:generate"
                        '''
                    } else {
                        sh '''
                            echo "Running test pipeline locally on agent..."
                            npm run typecheck
                            mkdir -p reports
                            npm run test:api
                            npm run test:ui
                            npm run allure:generate || true
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            // Publish JUnit XML results to Jenkins dashboard
            junit(
                testResults: 'reports/junit/junit-results.xml',
                allowEmptyResults: true
            )

            // Archive all Playwright reports, logs, and Allure outputs
            archiveArtifacts(
                artifacts: 'reports/**, test-results/**',
                allowEmptyArchive: true
            )

            // Publish the Playwright HTML report viewable directly in Jenkins
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'reports/playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }

        success {
            echo 'Playwright test pipeline completed successfully!'
        }

        failure {
            echo 'Playwright test pipeline failed. Check the archived reports and HTML view.'
        }
    }
}