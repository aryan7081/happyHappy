from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from .models import CustomUser, MembershipPlan


class CustomUserModelTest(TestCase):
    """Unit tests for CustomUser model."""

    def test_create_user(self):
        user = CustomUser.objects.create_user(
            email="test@example.com",
            username="testuser",
            password="testpass123",
        )
        self.assertEqual(user.email, "test@example.com")
        self.assertEqual(user.username, "testuser")
        self.assertTrue(user.check_password("testpass123"))

    def test_user_str(self):
        user = CustomUser.objects.create_user(
            email="str@example.com",
            username="struser",
            password="testpass123",
        )
        self.assertIn("struser", str(user))


class MembershipPlanModelTest(TestCase):
    """Unit tests for MembershipPlan model."""

    def setUp(self):
        self.plan = MembershipPlan.objects.create(
            name="Basic",
            duration="monthly",
            price=999.00,
            description="Basic plan",
        )

    def test_get_duration_days_monthly(self):
        self.assertEqual(self.plan.get_duration_days(), 30)

    def test_get_duration_days_annual(self):
        self.plan.duration = "annual"
        self.plan.save()
        self.assertEqual(self.plan.get_duration_days(), 365)


class SignupAPITest(TestCase):
    """Unit tests for Signup API."""

    def setUp(self):
        self.client = APIClient()

    def test_signup_success(self):
        data = {
            "email": "newuser@example.com",
            "password": "securepass123",
            "full_name": "Test User",
        }
        response = self.client.post("/api/register/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("id", response.data)
        self.assertEqual(response.data["email"], "newuser@example.com")

    def test_signup_duplicate_email_fails(self):
        CustomUser.objects.create_user(
            email="existing@example.com",
            username="existing",
            password="pass123",
        )
        data = {
            "email": "existing@example.com",
            "password": "newpass123",
        }
        response = self.client.post("/api/register/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class LoginAPITest(TestCase):
    """Unit tests for Login API."""

    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(
            email="login@example.com",
            username="loginuser",
            password="testpass123",
        )

    def test_login_success(self):
        data = {"email": "login@example.com", "password": "testpass123"}
        response = self.client.post("/api/login/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)
        self.assertEqual(response.data["email"], "login@example.com")

    def test_login_invalid_credentials(self):
        data = {"email": "login@example.com", "password": "wrongpass"}
        response = self.client.post("/api/login/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class MembershipPlanAPITest(TestCase):
    """Integration tests: API + DB for membership plans."""

    def setUp(self):
        self.client = APIClient()

    def test_list_membership_plans(self):
        MembershipPlan.objects.create(
            name="Plan A",
            duration="monthly",
            price=500.00,
            is_active=True,
        )
        response = self.client.get("/api/membership-plans/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
