{
  "openapi": "3.1.0",
  "info": {
    "title": "Antalya Student Sports & Deals Platform",
    "description": "Backend API for student sports facilities, cafeterias, deals, and community forum",
    "version": "1.0.0"
  },
  "paths": {
    "/": {
      "get": {
        "tags": [
          "Health"
        ],
        "summary": "Root",
        "description": "API health check endpoint.\n\nReturns:\n    dict: API status ve versiyon bilgisi",
        "operationId": "root__get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          }
        }
      }
    },
    "/health": {
      "get": {
        "tags": [
          "Health"
        ],
        "summary": "Health Check",
        "description": "Detaylı health check endpoint.\n\nChecks:\n- Database connectivity\n- Application status\n\nReturns:\n    dict: Sistem durumu",
        "operationId": "health_check_health_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          }
        }
      }
    },
    "/api/v1/auth/register": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "Register",
        "description": "Yeni kullanıcı kaydı.\n\n- Email unique olmalı\n- Parola hash'lenir\n- Varsayılan role: \"user\"\n- Otomatik login (token döner)",
        "operationId": "register_api_v1_auth_register_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TokenResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/auth/register/admin": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "Register",
        "description": "Yeni kullanıcı kaydı.\n\n- Email unique olmalı\n- Parola hash'lenir\n- Varsayılan role: \"admin\"\n- Otomatik login (token döner)",
        "operationId": "register_api_v1_auth_register_admin_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TokenResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/auth/login": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "Login",
        "description": "Kullanıcı girişi.\n\n- Email ve parola doğrulama\n- JWT token döner",
        "operationId": "login_api_v1_auth_login_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TokenResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/users/me": {
      "get": {
        "tags": [
          "Users"
        ],
        "summary": "Get Current User Profile",
        "description": "Mevcut kullanıcının profil bilgilerini döner.\n\nJWT token ile kimlik doğrulama gerekir.",
        "operationId": "get_current_user_profile_api_v1_users_me_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserRead"
                }
              }
            }
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      },
      "put": {
        "tags": [
          "Users"
        ],
        "summary": "Update Current User Profile",
        "description": "Kullanıcı kendi profil bilgilerini günceller.\n\nŞimdilik sadece display_name güncellenebilir.",
        "operationId": "update_current_user_profile_api_v1_users_me_put",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserUpdate"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserRead"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/v1/users/me/password": {
      "put": {
        "tags": [
          "Users"
        ],
        "summary": "Change Password",
        "description": "Kullanıcı şifresini değiştirir.\n\nMevcut şifreyi doğrula, yeni şifreyi hash'le ve kaydet.",
        "operationId": "change_password_api_v1_users_me_password_put",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PasswordChange"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "additionalProperties": true,
                  "type": "object",
                  "title": "Response Change Password Api V1 Users Me Password Put"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/v1/users/me/posts": {
      "get": {
        "tags": [
          "Users"
        ],
        "summary": "Get My Posts",
        "description": "Kullanıcının kendi postlarını listele.",
        "operationId": "get_my_posts_api_v1_users_me_posts_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "items": {

                  },
                  "type": "array",
                  "title": "Response Get My Posts Api V1 Users Me Posts Get"
                }
              }
            }
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/v1/users/me/comments": {
      "get": {
        "tags": [
          "Users"
        ],
        "summary": "Get My Comments",
        "description": "Kullanıcının kendi yorumlarını listele.",
        "operationId": "get_my_comments_api_v1_users_me_comments_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "items": {

                  },
                  "type": "array",
                  "title": "Response Get My Comments Api V1 Users Me Comments Get"
                }
              }
            }
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/v1/users/me/reviews": {
      "get": {
        "tags": [
          "Users"
        ],
        "summary": "Get My Reviews",
        "description": "Kullanıcının kendi review'larını listele.",
        "operationId": "get_my_reviews_api_v1_users_me_reviews_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "items": {

                  },
                  "type": "array",
                  "title": "Response Get My Reviews Api V1 Users Me Reviews Get"
                }
              }
            }
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/v1/places": {
      "get": {
        "tags": [
          "Places"
        ],
        "summary": "List Places",
        "description": "Tesisleri/kafeleri listele.\n\nQuery params:\n- type: Tür filtresi (opsiyonel)",
        "operationId": "list_places_api_v1_places_get",
        "parameters": [
          {
            "name": "type",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "description": "Filter by type: facility, cafe, university_cafeteria, other",
              "title": "Type"
            },
            "description": "Filter by type: facility, cafe, university_cafeteria, other"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PlaceRead"
                  },
                  "title": "Response List Places Api V1 Places Get"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Places"
        ],
        "summary": "Create Place",
        "description": "Yeni tesis/kafe ekle (Admin only).",
        "operationId": "create_place_api_v1_places_post",
        "security": [
          {
            "Bearer": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PlaceCreate"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PlaceRead"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/places/search": {
      "get": {
        "tags": [
          "Places"
        ],
        "summary": "Search Places",
        "description": "Tesis ara (isim, adres, şehir).\n\nQuery params:\n- q: Arama terimi (zorunlu)\n- type: Tür filtresi (opsiyonel)",
        "operationId": "search_places_api_v1_places_search_get",
        "parameters": [
          {
            "name": "q",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "minLength": 1,
              "description": "Search query",
              "title": "Q"
            },
            "description": "Search query"
          },
          {
            "name": "type",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "description": "Filter by type",
              "title": "Type"
            },
            "description": "Filter by type"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PlaceRead"
                  },
                  "title": "Response Search Places Api V1 Places Search Get"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/places/top-rated": {
      "get": {
        "tags": [
          "Places"
        ],
        "summary": "Get Top Rated Places",
        "description": "En yüksek puanlı tesisler.\n\nQuery params:\n- limit: Kaç tesis döndürülecek (default: 10, max: 50)\n- min_reviews: Minimum review sayısı (default: 1)",
        "operationId": "get_top_rated_places_api_v1_places_top_rated_get",
        "parameters": [
          {
            "name": "limit",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "maximum": 50,
              "minimum": 1,
              "description": "Number of places to return",
              "default": 10,
              "title": "Limit"
            },
            "description": "Number of places to return"
          },
          {
            "name": "min_reviews",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "description": "Minimum number of reviews",
              "default": 1,
              "title": "Min Reviews"
            },
            "description": "Minimum number of reviews"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "additionalProperties": true
                  },
                  "title": "Response Get Top Rated Places Api V1 Places Top Rated Get"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/places/{place_id}": {
      "get": {
        "tags": [
          "Places"
        ],
        "summary": "Get Place",
        "description": "Belirli bir tesisin detaylarını döner.",
        "operationId": "get_place_api_v1_places__place_id__get",
        "parameters": [
          {
            "name": "place_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Place Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PlaceRead"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "Places"
        ],
        "summary": "Update Place",
        "description": "Tesis/kafe bilgilerini güncelle (Admin only).",
        "operationId": "update_place_api_v1_places__place_id__put",
        "security": [
          {
            "Bearer": []
          }
        ],
        "parameters": [
          {
            "name": "place_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Place Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PlaceUpdate"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PlaceRead"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Places"
        ],
        "summary": "Delete Place",
        "description": "Tesis/kafe sil (Admin only).",
        "operationId": "delete_place_api_v1_places__place_id__delete",
        "security": [
          {
            "Bearer": []
          }
        ],
        "parameters": [
          {
            "name": "place_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Place Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/slots": {
      "get": {
        "tags": [
          "Slots"
        ],
        "summary": "List Slots",
        "description": "Spor sahası seanslarını listele.\n\nQuery params:\n- place_id: Tesis ID\n- date: Tarih filtresi (YYYY-MM-DD)\n- branch: Branş filtresi (Futbol, Tenis, vs.)\n- status: Durum filtresi (BOS/DOLU)\n\nNot: Slot verileri BF4.py scraper ile doldurulur.",
        "operationId": "list_slots_api_v1_slots_get",
        "parameters": [
          {
            "name": "place_id",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "description": "Filter by place ID",
              "title": "Place Id"
            },
            "description": "Filter by place ID"
          },
          {
            "name": "date",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string",
                  "format": "date"
                },
                {
                  "type": "null"
                }
              ],
              "description": "Filter by date (YYYY-MM-DD)",
              "title": "Date"
            },
            "description": "Filter by date (YYYY-MM-DD)"
          },
          {
            "name": "branch",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "description": "Filter by branch (Futbol, Tenis, etc.)",
              "title": "Branch"
            },
            "description": "Filter by branch (Futbol, Tenis, etc.)"
          },
          {
            "name": "status",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "description": "Filter by status (BOS/DOLU)",
              "title": "Status"
            },
            "description": "Filter by status (BOS/DOLU)"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/SlotRead"
                  },
                  "title": "Response List Slots Api V1 Slots Get"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/places/{place_id}/reviews": {
      "get": {
        "tags": [
          "Reviews"
        ],
        "summary": "List Reviews",
        "description": "Belirli bir tesisin yorumlarını listele.",
        "operationId": "list_reviews_api_v1_places__place_id__reviews_get",
        "parameters": [
          {
            "name": "place_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Place Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ReviewRead"
                  },
                  "title": "Response List Reviews Api V1 Places  Place Id  Reviews Get"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Reviews"
        ],
        "summary": "Create Review",
        "description": "Yeni değerlendirme ekle.\n\nBanlı kullanıcılar değerlendirme yapamaz.",
        "operationId": "create_review_api_v1_places__place_id__reviews_post",
        "security": [
          {
            "Bearer": []
          }
        ],
        "parameters": [
          {
            "name": "place_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Place Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ReviewCreate"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReviewRead"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/places/{place_id}/rating-summary": {
      "get": {
        "tags": [
          "Reviews"
        ],
        "summary": "Get Rating Summary",
        "description": "Tesis için ortalama rating ve toplam review sayısı.",
        "operationId": "get_rating_summary_api_v1_places__place_id__rating_summary_get",
        "parameters": [
          {
            "name": "place_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Place Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RatingSummary"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/reviews/{review_id}": {
      "put": {
        "tags": [
          "Reviews"
        ],
        "summary": "Update Review",
        "description": "Kullanıcı kendi review'ını güncelle.",
        "operationId": "update_review_api_v1_reviews__review_id__put",
        "security": [
          {
            "Bearer": []
          }
        ],
        "parameters": [
          {
            "name": "review_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Review Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ReviewUpdate"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReviewRead"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Reviews"
        ],
        "summary": "Delete Review",
        "description": "Kullanıcı kendi review'ını sil.",
        "operationId": "delete_review_api_v1_reviews__review_id__delete",
        "security": [
          {
            "Bearer": []
          }
        ],
        "parameters": [
          {
            "name": "review_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Review Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/posts/search": {
      "get": {
        "tags": [
          "Posts"
        ],
        "summary": "Search Posts",
        "description": "Post ara (başlık, içerik).\n\nQuery params:\n- q: Arama terimi (zorunlu)\n- category: Kategori filtresi (opsiyonel)",
        "operationId": "search_posts_api_v1_posts_search_get",
        "parameters": [
          {
            "name": "q",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "minLength": 1,
              "description": "Search query",
              "title": "Q"
            },
            "description": "Search query"
          },
          {
            "name": "category",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "description": "Filter by category",
              "title": "Category"
            },
            "description": "Filter by category"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PostWithScore"
                  },
                  "title": "Response Search Posts Api V1 Posts Search Get"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/posts/popular": {
      "get": {
        "tags": [
          "Posts"
        ],
        "summary": "Get Popular Posts",
        "description": "En çok oy alan popüler postlar.\n\nQuery params:\n- limit: Kaç post döndürülecek (default: 10, max: 50)",
        "operationId": "get_popular_posts_api_v1_posts_popular_get",
        "parameters": [
          {
            "name": "limit",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "maximum": 50,
              "minimum": 1,
              "description": "Number of posts to return",
              "default": 10,
              "title": "Limit"
            },
            "description": "Number of posts to return"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PostWithScore"
                  },
                  "title": "Response Get Popular Posts Api V1 Posts Popular Get"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/posts": {
      "get": {
        "tags": [
          "Posts"
        ],
        "summary": "List Posts",
        "description": "Post listesi.\n\nQuery params:\n- category: Kategori filtresi (opsiyonel)\n- page: Sayfa numarası (1-based)\n- page_size: Sayfa başına item (max: 100)\n\nNOT: current_user opsiyonel (login olmadan da görüntülenebilir).\nAma login'se current_user_vote bilgisi de dönebilir (geliştirilecek).",
        "operationId": "list_posts_api_v1_posts_get",
        "parameters": [
          {
            "name": "category",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "description": "Filter by category",
              "title": "Category"
            },
            "description": "Filter by category"
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "description": "Page number",
              "default": 1,
              "title": "Page"
            },
            "description": "Page number"
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "maximum": 100,
              "minimum": 1,
              "description": "Items per page",
              "default": 20,
              "title": "Page Size"
            },
            "description": "Items per page"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "anyOf": [
                  {
                    "$ref": "#/components/schemas/User"
                  },
                  {
                    "type": "null"
                  }
                ],
                "title": "Current User"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PostWithScore"
                  },
                  "title": "Response List Posts Api V1 Posts Get"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Posts"
        ],
        "summary": "Create Post",
        "description": "Yeni post oluştur.\n\n- Kategori önceden belirlenen enum'dan biri olmalı (Pydantic validation)\n- Banlı kullanıcılar post açamaz",
        "operationId": "create_post_api_v1_posts_post",
        "security": [
          {
            "Bearer": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PostCreate"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PostRead"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/posts/with-image": {
      "post": {
        "tags": [
          "Posts"
        ],
        "summary": "Create Post With Image",
        "description": "Yeni post oluştur ve opsiyonel olarak resim yükle (tek request'te).\n\n- Resim varsa önce Cloudinary'ye upload edilir\n- Sonra post oluşturulur ve resim URL'i otomatik eklenir\n- Resim yoksa normal post oluşturulur\n\nForm Fields:\n- title: Post başlığı (required)\n- body: Post içeriği (required)\n- category: Kategori (required) - spor, yemek, eglence, gundem, diger, soru, tavsiye\n- place_id: İlgili tesis ID'si (optional)\n- image: Resim dosyası (optional, max 5MB)",
        "operationId": "create_post_with_image_api_v1_posts_with_image_post",
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "$ref": "#/components/schemas/Body_create_post_with_image_api_v1_posts_with_image_post"
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PostRead"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/v1/posts/{post_id}": {
      "get": {
        "tags": [
          "Posts"
        ],
        "summary": "Get Post",
        "description": "Belirli bir post'un detaylarını döner.",
        "operationId": "get_post_api_v1_posts__post_id__get",
        "parameters": [
          {
            "name": "post_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Post Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PostWithScore"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "Posts"
        ],
        "summary": "Update Post",
        "description": "Kullanıcı kendi postunu güncelle.\n\nSadece title ve body güncellenebilir.",
        "operationId": "update_post_api_v1_posts__post_id__put",
        "security": [
          {
            "Bearer": []
          }
        ],
        "parameters": [
          {
            "name": "post_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Post Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PostUpdate"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PostRead"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Posts"
        ],
        "summary": "Delete Post",
        "description": "Kullanıcı kendi postunu sil.",
        "operationId": "delete_post_api_v1_posts__post_id__delete",
        "security": [
          {
            "Bearer": []
          }
        ],
        "parameters": [
          {
            "name": "post_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Post Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/posts/{post_id}/comments": {
      "get": {
        "tags": [
          "Posts"
        ],
        "summary": "List Comments",
        "description": "Post altındaki yorumları listele.",
        "operationId": "list_comments_api_v1_posts__post_id__comments_get",
        "parameters": [
          {
            "name": "post_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Post Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/CommentRead"
                  },
                  "title": "Response List Comments Api V1 Posts  Post Id  Comments Get"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Comments"
        ],
        "summary": "Create Comment",
        "description": "Post altına yorum ekle.\n\nBanlı kullanıcılar yorum yapamaz.",
        "operationId": "create_comment_api_v1_posts__post_id__comments_post",
        "security": [
          {
            "Bearer": []
          }
        ],
        "parameters": [
          {
            "name": "post_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Post Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CommentCreate"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CommentRead"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/comments/{comment_id}": {
      "put": {
        "tags": [
          "Comments"
        ],
        "summary": "Update Comment",
        "description": "Kullanıcı kendi yorumunu güncelle.",
        "operationId": "update_comment_api_v1_comments__comment_id__put",
        "security": [
          {
            "Bearer": []
          }
        ],
        "parameters": [
          {
            "name": "comment_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Comment Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CommentUpdate"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CommentRead"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Comments"
        ],
        "summary": "Delete Comment",
        "description": "Kullanıcı kendi yorumunu sil.",
        "operationId": "delete_comment_api_v1_comments__comment_id__delete",
        "security": [
          {
            "Bearer": []
          }
        ],
        "parameters": [
          {
            "name": "comment_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Comment Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/votes": {
      "post": {
        "tags": [
          "Votes"
        ],
        "summary": "Create Or Update Vote",
        "description": "Upvote/downvote ekle veya güncelle.\n\n- target_type: \"post\" veya \"comment\"\n- target_id: Post/Comment ID\n- value: +1 (upvote) veya -1 (downvote)\n\nEğer kullanıcı daha önce oy verdiyse, oy güncellenir (upsert).\nAynı oy tekrar verilirse değişmez.\n\nBanlı kullanıcılar oy veremez.",
        "operationId": "create_or_update_vote_api_v1_votes_post",
        "security": [
          {
            "Bearer": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/VoteCreate"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/VoteResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Votes"
        ],
        "summary": "Delete Vote",
        "description": "Oyunu geri çek (vote'u sil).\n\nQuery params:\n- target_type: \"post\" veya \"comment\"\n- target_id: Post/Comment ID\n\nKullanıcı yanlışlıkla oy verdiyse geri çekebilir.",
        "operationId": "delete_vote_api_v1_votes_delete",
        "security": [
          {
            "Bearer": []
          }
        ],
        "parameters": [
          {
            "name": "target_type",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Target Type"
            }
          },
          {
            "name": "target_id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Target Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/VoteResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/blogs": {
      "get": {
        "tags": [
          "Blogs"
        ],
        "summary": "List Blogs",
        "description": "Blog listesi.\n\nQuery params:\n- only_published: Sadece yayınlanmış blog'ları göster (default: True)\n- page: Sayfa numarası\n- page_size: Sayfa başına item\n\nNormal kullanıcılar sadece published blog'ları görebilir.",
        "operationId": "list_blogs_api_v1_blogs_get",
        "parameters": [
          {
            "name": "only_published",
            "in": "query",
            "required": false,
            "schema": {
              "type": "boolean",
              "description": "Only show published blogs",
              "default": true,
              "title": "Only Published"
            },
            "description": "Only show published blogs"
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "description": "Page number",
              "default": 1,
              "title": "Page"
            },
            "description": "Page number"
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "maximum": 100,
              "minimum": 1,
              "description": "Items per page",
              "default": 20,
              "title": "Page Size"
            },
            "description": "Items per page"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/BlogRead"
                  },
                  "title": "Response List Blogs Api V1 Blogs Get"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/blogs/slug/{slug}": {
      "get": {
        "tags": [
          "Blogs"
        ],
        "summary": "Get Blog By Slug",
        "description": "Slug ile blog yazısını döner (SEO friendly).\n\nÖrnek: /api/v1/blogs/slug/antalya-spor-rehberi-2025",
        "operationId": "get_blog_by_slug_api_v1_blogs_slug__slug__get",
        "parameters": [
          {
            "name": "slug",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Slug"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BlogRead"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/blogs/{blog_id}": {
      "get": {
        "tags": [
          "Blogs"
        ],
        "summary": "Get Blog",
        "description": "Belirli bir blog yazısını döner.\n\nBlog ID veya slug ile erişilebilir (şimdilik ID).",
        "operationId": "get_blog_api_v1_blogs__blog_id__get",
        "parameters": [
          {
            "name": "blog_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Blog Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BlogRead"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/cafeterias/menus": {
      "get": {
        "tags": [
          "Cafeterias"
        ],
        "summary": "List Menus",
        "description": "Yemekhane menülerini listele.\n\nQuery params:\n- place_id: Üniversite yemekhane ID'si\n- date: Tarih filtresi\n- meal_type: Öğün türü filtresi\n\nAdmin menüleri CRUD ile yönetir, kullanıcılar sadece görüntüler.",
        "operationId": "list_menus_api_v1_cafeterias_menus_get",
        "parameters": [
          {
            "name": "place_id",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "description": "Filter by place ID (university cafeteria)",
              "title": "Place Id"
            },
            "description": "Filter by place ID (university cafeteria)"
          },
          {
            "name": "date",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string",
                  "format": "date"
                },
                {
                  "type": "null"
                }
              ],
              "description": "Filter by date (YYYY-MM-DD)",
              "title": "Date"
            },
            "description": "Filter by date (YYYY-MM-DD)"
          },
          {
            "name": "meal_type",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "description": "Filter by meal type (kahvalti, ogle, aksam)",
              "title": "Meal Type"
            },
            "description": "Filter by meal type (kahvalti, ogle, aksam)"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/MenuRead"
                  },
                  "title": "Response List Menus Api V1 Cafeterias Menus Get"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/upload/image": {
      "post": {
        "tags": [
          "Upload"
        ],
        "summary": "Upload Image Endpoint",
        "description": "Cloudinary'ye resim yükle.\n\n- **file**: Upload edilecek resim dosyası (JPEG, PNG, GIF, etc.)\n- **folder**: Cloudinary klasör adı (default: \"hackathon\")\n\nReturns:\n    - secure_url: HTTPS resim URL'i\n    - public_id: Cloudinary public ID (silme için kullanılabilir)\n    - width: Resim genişliği\n    - height: Resim yüksekliği\n    - format: Resim formatı (jpg, png, etc.)",
        "operationId": "upload_image_endpoint_api_v1_upload_image_post",
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "$ref": "#/components/schemas/Body_upload_image_endpoint_api_v1_upload_image_post"
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "additionalProperties": true,
                  "type": "object",
                  "title": "Response Upload Image Endpoint Api V1 Upload Image Post"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/v1/upload/image/{public_id}": {
      "delete": {
        "tags": [
          "Upload"
        ],
        "summary": "Delete Image Endpoint",
        "description": "Cloudinary'den resim sil.\n\n- **public_id**: Silinecek resmin Cloudinary public ID'si\n\nNOT: Public ID genelde \"folder/filename\" formatındadır.\nÖrnek: \"hackathon/abc123xyz\"",
        "operationId": "delete_image_endpoint_api_v1_upload_image__public_id__delete",
        "security": [
          {
            "Bearer": []
          }
        ],
        "parameters": [
          {
            "name": "public_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Public Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/upload/image/post": {
      "post": {
        "tags": [
          "Upload"
        ],
        "summary": "Upload Post Image",
        "description": "Forum post için resim yükle.\n\nOtomatik olarak \"hackathon/posts\" klasörüne upload eder.",
        "operationId": "upload_post_image_api_v1_upload_image_post_post",
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "$ref": "#/components/schemas/Body_upload_post_image_api_v1_upload_image_post_post"
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "additionalProperties": true,
                  "type": "object",
                  "title": "Response Upload Post Image Api V1 Upload Image Post Post"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/v1/upload/image/blog": {
      "post": {
        "tags": [
          "Upload"
        ],
        "summary": "Upload Blog Image",
        "description": "Blog post için cover image yükle.\n\nOtomatik olarak \"hackathon/blogs\" klasörüne upload eder.",
        "operationId": "upload_blog_image_api_v1_upload_image_blog_post",
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "$ref": "#/components/schemas/Body_upload_blog_image_api_v1_upload_image_blog_post"
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "additionalProperties": true,
                  "type": "object",
                  "title": "Response Upload Blog Image Api V1 Upload Image Blog Post"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/v1/admin/users/{user_id}/ban": {
      "post": {
        "tags": [
          "Admin"
        ],
        "summary": "Ban User",
        "description": "Kullanıcıyı ban/unban et (Admin only).\n\nBody: { \"is_banned\": true/false }",
        "operationId": "ban_user_api_v1_admin_users__user_id__ban_post",
        "security": [
          {
            "Bearer": []
          }
        ],
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "User Id"
            }
          },
          {
            "name": "is_banned",
            "in": "query",
            "required": true,
            "schema": {
              "type": "boolean",
              "title": "Is Banned"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/admin/posts/{post_id}": {
      "delete": {
        "tags": [
          "Admin"
        ],
        "summary": "Delete Post",
        "description": "Post sil (Admin only).",
        "operationId": "delete_post_api_v1_admin_posts__post_id__delete",
        "security": [
          {
            "Bearer": []
          }
        ],
        "parameters": [
          {
            "name": "post_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Post Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/admin/comments/{comment_id}": {
      "delete": {
        "tags": [
          "Admin"
        ],
        "summary": "Delete Comment",
        "description": "Comment sil (Admin only).",
        "operationId": "delete_comment_api_v1_admin_comments__comment_id__delete",
        "security": [
          {
            "Bearer": []
          }
        ],
        "parameters": [
          {
            "name": "comment_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Comment Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/admin/blogs": {
      "post": {
        "tags": [
          "Admin"
        ],
        "summary": "Create Blog",
        "description": "Yeni blog oluştur (Admin only).",
        "operationId": "create_blog_api_v1_admin_blogs_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BlogCreate"
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BlogRead"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/v1/admin/blogs/with-image": {
      "post": {
        "tags": [
          "Admin"
        ],
        "summary": "Create Blog With Image",
        "description": "Yeni blog oluştur ve opsiyonel cover image yükle (Admin only).\n\n- Cover image varsa önce Cloudinary'ye upload edilir\n- Sonra blog oluşturulur ve cover image URL'i otomatik eklenir\n- Image yoksa normal blog oluşturulur\n\nForm Fields:\n- title: Blog başlığı (required)\n- slug: SEO-friendly URL slug (required)\n- summary: Kısa özet (required)\n- content: Blog içeriği (required)\n- is_published: Yayınla? (default: false)\n- cover_image: Cover image dosyası (optional, max 8MB)",
        "operationId": "create_blog_with_image_api_v1_admin_blogs_with_image_post",
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "$ref": "#/components/schemas/Body_create_blog_with_image_api_v1_admin_blogs_with_image_post"
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BlogRead"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/v1/admin/blogs/{blog_id}": {
      "put": {
        "tags": [
          "Admin"
        ],
        "summary": "Update Blog",
        "description": "Blog güncelle (Admin only).",
        "operationId": "update_blog_api_v1_admin_blogs__blog_id__put",
        "security": [
          {
            "Bearer": []
          }
        ],
        "parameters": [
          {
            "name": "blog_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Blog Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BlogUpdate"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BlogRead"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Admin"
        ],
        "summary": "Delete Blog",
        "description": "Blog sil (Admin only).",
        "operationId": "delete_blog_api_v1_admin_blogs__blog_id__delete",
        "security": [
          {
            "Bearer": []
          }
        ],
        "parameters": [
          {
            "name": "blog_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Blog Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/admin/cafeterias/menus": {
      "post": {
        "tags": [
          "Admin"
        ],
        "summary": "Create Menu",
        "description": "Yeni menü oluştur (Admin only).",
        "operationId": "create_menu_api_v1_admin_cafeterias_menus_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MenuCreate"
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/MenuRead"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/v1/admin/cafeterias/menus/{menu_id}": {
      "put": {
        "tags": [
          "Admin"
        ],
        "summary": "Update Menu",
        "description": "Menü güncelle (Admin only).",
        "operationId": "update_menu_api_v1_admin_cafeterias_menus__menu_id__put",
        "security": [
          {
            "Bearer": []
          }
        ],
        "parameters": [
          {
            "name": "menu_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Menu Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MenuUpdate"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/MenuRead"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Admin"
        ],
        "summary": "Delete Menu",
        "description": "Menü sil (Admin only).",
        "operationId": "delete_menu_api_v1_admin_cafeterias_menus__menu_id__delete",
        "security": [
          {
            "Bearer": []
          }
        ],
        "parameters": [
          {
            "name": "menu_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Menu Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/admin/slots/import": {
      "post": {
        "tags": [
          "Admin"
        ],
        "summary": "Import Slots",
        "description": "BF4.py scraper'dan gelen slot verilerini DB'ye kaydet (Admin only).\n\nBody: { \"slots\": [SlotImport, ...] }\n\nUpsert mantığı: mevcut slot varsa (date+start_time+field) güncelle, yoksa ekle.\nŞimdilik basit insert yapıyoruz (hackathon modu).",
        "operationId": "import_slots_api_v1_admin_slots_import_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SlotImportBatch"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    }
  },
  "components": {
    "schemas": {
      "BlogCreate": {
        "properties": {
          "title": {
            "type": "string",
            "title": "Title"
          },
          "slug": {
            "type": "string",
            "title": "Slug"
          },
          "content": {
            "type": "string",
            "title": "Content"
          },
          "image_url": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Image Url"
          },
          "is_published": {
            "type": "boolean",
            "title": "Is Published",
            "default": false
          }
        },
        "type": "object",
        "required": [
          "title",
          "slug",
          "content"
        ],
        "title": "BlogCreate",
        "description": "Blog oluşturma request (admin)."
      },
      "BlogRead": {
        "properties": {
          "id": {
            "type": "integer",
            "title": "Id"
          },
          "title": {
            "type": "string",
            "title": "Title"
          },
          "slug": {
            "type": "string",
            "title": "Slug"
          },
          "content": {
            "type": "string",
            "title": "Content"
          },
          "image_url": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Image Url"
          },
          "author_id": {
            "type": "integer",
            "title": "Author Id"
          },
          "is_published": {
            "type": "boolean",
            "title": "Is Published"
          },
          "published_at": {
            "anyOf": [
              {
                "type": "string",
                "format": "date-time"
              },
              {
                "type": "null"
              }
            ],
            "title": "Published At"
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "title": "Created At"
          },
          "updated_at": {
            "type": "string",
            "format": "date-time",
            "title": "Updated At"
          }
        },
        "type": "object",
        "required": [
          "id",
          "title",
          "slug",
          "content",
          "image_url",
          "author_id",
          "is_published",
          "published_at",
          "created_at",
          "updated_at"
        ],
        "title": "BlogRead",
        "description": "Blog read response."
      },
      "BlogUpdate": {
        "properties": {
          "title": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Title"
          },
          "slug": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Slug"
          },
          "content": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Content"
          },
          "image_url": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Image Url"
          },
          "is_published": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Is Published"
          }
        },
        "type": "object",
        "title": "BlogUpdate",
        "description": "Blog güncelleme request (admin)."
      },
      "Body_create_blog_with_image_api_v1_admin_blogs_with_image_post": {
        "properties": {
          "title": {
            "type": "string",
            "title": "Title",
            "description": "Blog title"
          },
          "slug": {
            "type": "string",
            "title": "Slug",
            "description": "URL-friendly slug"
          },
          "summary": {
            "type": "string",
            "title": "Summary",
            "description": "Short summary"
          },
          "content": {
            "type": "string",
            "title": "Content",
            "description": "Full blog content (markdown/HTML)"
          },
          "is_published": {
            "type": "boolean",
            "title": "Is Published",
            "description": "Publish immediately?",
            "default": false
          },
          "cover_image": {
            "anyOf": [
              {
                "type": "string",
                "format": "binary"
              },
              {
                "type": "null"
              }
            ],
            "title": "Cover Image",
            "description": "Optional cover image"
          }
        },
        "type": "object",
        "required": [
          "title",
          "slug",
          "summary",
          "content"
        ],
        "title": "Body_create_blog_with_image_api_v1_admin_blogs_with_image_post"
      },
      "Body_create_post_with_image_api_v1_posts_with_image_post": {
        "properties": {
          "title": {
            "type": "string",
            "title": "Title",
            "description": "Post title"
          },
          "body": {
            "type": "string",
            "title": "Body",
            "description": "Post content"
          },
          "category": {
            "type": "string",
            "title": "Category",
            "description": "Post category"
          },
          "place_id": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Place Id",
            "description": "Related place ID"
          },
          "image": {
            "anyOf": [
              {
                "type": "string",
                "format": "binary"
              },
              {
                "type": "null"
              }
            ],
            "title": "Image",
            "description": "Optional image file"
          }
        },
        "type": "object",
        "required": [
          "title",
          "body",
          "category"
        ],
        "title": "Body_create_post_with_image_api_v1_posts_with_image_post"
      },
      "Body_upload_blog_image_api_v1_upload_image_blog_post": {
        "properties": {
          "file": {
            "type": "string",
            "format": "binary",
            "title": "File",
            "description": "Blog cover image file"
          }
        },
        "type": "object",
        "required": [
          "file"
        ],
        "title": "Body_upload_blog_image_api_v1_upload_image_blog_post"
      },
      "Body_upload_image_endpoint_api_v1_upload_image_post": {
        "properties": {
          "file": {
            "type": "string",
            "format": "binary",
            "title": "File",
            "description": "Image file to upload"
          },
          "folder": {
            "type": "string",
            "title": "Folder",
            "description": "Cloudinary folder name",
            "default": "hackathon"
          }
        },
        "type": "object",
        "required": [
          "file"
        ],
        "title": "Body_upload_image_endpoint_api_v1_upload_image_post"
      },
      "Body_upload_post_image_api_v1_upload_image_post_post": {
        "properties": {
          "file": {
            "type": "string",
            "format": "binary",
            "title": "File",
            "description": "Post image file"
          }
        },
        "type": "object",
        "required": [
          "file"
        ],
        "title": "Body_upload_post_image_api_v1_upload_image_post_post"
      },
      "CommentCreate": {
        "properties": {
          "body": {
            "type": "string",
            "title": "Body"
          }
        },
        "type": "object",
        "required": [
          "body"
        ],
        "title": "CommentCreate",
        "description": "Comment oluşturma request."
      },
      "CommentRead": {
        "properties": {
          "id": {
            "type": "integer",
            "title": "Id"
          },
          "post_id": {
            "type": "integer",
            "title": "Post Id"
          },
          "user_id": {
            "type": "integer",
            "title": "User Id"
          },
          "body": {
            "type": "string",
            "title": "Body"
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "title": "Created At"
          }
        },
        "type": "object",
        "required": [
          "id",
          "post_id",
          "user_id",
          "body",
          "created_at"
        ],
        "title": "CommentRead",
        "description": "Comment read response."
      },
      "CommentUpdate": {
        "properties": {
          "body": {
            "type": "string",
            "title": "Body"
          }
        },
        "type": "object",
        "required": [
          "body"
        ],
        "title": "CommentUpdate",
        "description": "Comment güncelleme request."
      },
      "HTTPValidationError": {
        "properties": {
          "detail": {
            "items": {
              "$ref": "#/components/schemas/ValidationError"
            },
            "type": "array",
            "title": "Detail"
          }
        },
        "type": "object",
        "title": "HTTPValidationError"
      },
      "LoginRequest": {
        "properties": {
          "email": {
            "type": "string",
            "format": "email",
            "title": "Email"
          },
          "password": {
            "type": "string",
            "title": "Password"
          }
        },
        "type": "object",
        "required": [
          "email",
          "password"
        ],
        "title": "LoginRequest",
        "description": "Login request."
      },
      "MenuCreate": {
        "properties": {
          "place_id": {
            "type": "integer",
            "title": "Place Id"
          },
          "date": {
            "type": "string",
            "format": "date",
            "title": "Date"
          },
          "meal_type": {
            "type": "string",
            "title": "Meal Type"
          },
          "items": {
            "type": "string",
            "title": "Items"
          }
        },
        "type": "object",
        "required": [
          "place_id",
          "date",
          "meal_type",
          "items"
        ],
        "title": "MenuCreate",
        "description": "Menü oluşturma request (admin)."
      },
      "MenuRead": {
        "properties": {
          "id": {
            "type": "integer",
            "title": "Id"
          },
          "place_id": {
            "type": "integer",
            "title": "Place Id"
          },
          "date": {
            "type": "string",
            "format": "date",
            "title": "Date"
          },
          "meal_type": {
            "type": "string",
            "title": "Meal Type"
          },
          "items": {
            "type": "string",
            "title": "Items"
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "title": "Created At"
          },
          "updated_at": {
            "type": "string",
            "format": "date-time",
            "title": "Updated At"
          }
        },
        "type": "object",
        "required": [
          "id",
          "place_id",
          "date",
          "meal_type",
          "items",
          "created_at",
          "updated_at"
        ],
        "title": "MenuRead",
        "description": "Menü read response."
      },
      "MenuUpdate": {
        "properties": {
          "date": {
            "type": "null",
            "title": "Date"
          },
          "meal_type": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Meal Type"
          },
          "items": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Items"
          }
        },
        "type": "object",
        "title": "MenuUpdate",
        "description": "Menü güncelleme request (admin)."
      },
      "PasswordChange": {
        "properties": {
          "current_password": {
            "type": "string",
            "title": "Current Password"
          },
          "new_password": {
            "type": "string",
            "title": "New Password"
          }
        },
        "type": "object",
        "required": [
          "current_password",
          "new_password"
        ],
        "title": "PasswordChange",
        "description": "Şifre değiştirme request."
      },
      "PlaceCreate": {
        "properties": {
          "name": {
            "type": "string",
            "title": "Name"
          },
          "type": {
            "type": "string",
            "title": "Type"
          },
          "address": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Address"
          },
          "city": {
            "type": "string",
            "title": "City",
            "default": "Antalya"
          },
          "district": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "District"
          },
          "lat": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Lat"
          },
          "lon": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Lon"
          },
          "external_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "External Id"
          }
        },
        "type": "object",
        "required": [
          "name",
          "type"
        ],
        "title": "PlaceCreate",
        "description": "Place oluşturma request (admin)."
      },
      "PlaceRead": {
        "properties": {
          "id": {
            "type": "integer",
            "title": "Id"
          },
          "name": {
            "type": "string",
            "title": "Name"
          },
          "type": {
            "type": "string",
            "title": "Type"
          },
          "address": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Address"
          },
          "city": {
            "type": "string",
            "title": "City"
          },
          "district": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "District"
          },
          "lat": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Lat"
          },
          "lon": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Lon"
          },
          "external_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "External Id"
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "title": "Created At"
          },
          "updated_at": {
            "type": "string",
            "format": "date-time",
            "title": "Updated At"
          }
        },
        "type": "object",
        "required": [
          "id",
          "name",
          "type",
          "address",
          "city",
          "district",
          "lat",
          "lon",
          "external_id",
          "created_at",
          "updated_at"
        ],
        "title": "PlaceRead",
        "description": "Place read response."
      },
      "PlaceUpdate": {
        "properties": {
          "name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Name"
          },
          "type": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Type"
          },
          "address": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Address"
          },
          "city": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "City"
          },
          "district": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "District"
          },
          "lat": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Lat"
          },
          "lon": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Lon"
          },
          "external_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "External Id"
          }
        },
        "type": "object",
        "title": "PlaceUpdate",
        "description": "Place güncelleme request (admin)."
      },
      "PostCategory": {
        "type": "string",
        "enum": [
          "Spor",
          "Yemek",
          "Video oyunlari",
          "Etkinlik",
          "Teknoloji",
          "Finans",
          "Sanat",
          "Edebiyat",
          "Diğer"
        ],
        "title": "PostCategory",
        "description": "Forum kategorileri (önceden belirlenen, kullanıcı serbest kategori açamaz)."
      },
      "PostCreate": {
        "properties": {
          "category": {
            "$ref": "#/components/schemas/PostCategory"
          },
          "title": {
            "type": "string",
            "title": "Title"
          },
          "body": {
            "type": "string",
            "title": "Body"
          },
          "place_id": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Place Id"
          },
          "image_url": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Image Url"
          }
        },
        "type": "object",
        "required": [
          "category",
          "title",
          "body"
        ],
        "title": "PostCreate",
        "description": "Post oluşturma request."
      },
      "PostRead": {
        "properties": {
          "id": {
            "type": "integer",
            "title": "Id"
          },
          "user_id": {
            "type": "integer",
            "title": "User Id"
          },
          "category": {
            "type": "string",
            "title": "Category"
          },
          "title": {
            "type": "string",
            "title": "Title"
          },
          "body": {
            "type": "string",
            "title": "Body"
          },
          "place_id": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Place Id"
          },
          "image_url": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Image Url"
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "title": "Created At"
          },
          "updated_at": {
            "type": "string",
            "format": "date-time",
            "title": "Updated At"
          }
        },
        "type": "object",
        "required": [
          "id",
          "user_id",
          "category",
          "title",
          "body",
          "place_id",
          "image_url",
          "created_at",
          "updated_at"
        ],
        "title": "PostRead",
        "description": "Post read response (temel)."
      },
      "PostUpdate": {
        "properties": {
          "title": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Title"
          },
          "body": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Body"
          },
          "image_url": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Image Url"
          }
        },
        "type": "object",
        "title": "PostUpdate",
        "description": "Post güncelleme request (şimdilik sadece title/body)."
      },
      "PostWithScore": {
        "properties": {
          "id": {
            "type": "integer",
            "title": "Id"
          },
          "user_id": {
            "type": "integer",
            "title": "User Id"
          },
          "category": {
            "type": "string",
            "title": "Category"
          },
          "title": {
            "type": "string",
            "title": "Title"
          },
          "body": {
            "type": "string",
            "title": "Body"
          },
          "place_id": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Place Id"
          },
          "image_url": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Image Url"
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "title": "Created At"
          },
          "updated_at": {
            "type": "string",
            "format": "date-time",
            "title": "Updated At"
          },
          "score": {
            "type": "integer",
            "title": "Score",
            "default": 0
          },
          "current_user_vote": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Current User Vote"
          }
        },
        "type": "object",
        "required": [
          "id",
          "user_id",
          "category",
          "title",
          "body",
          "place_id",
          "image_url",
          "created_at",
          "updated_at"
        ],
        "title": "PostWithScore",
        "description": "Post + vote score.\n\nVote sistemi entegre edildiğinde score (upvote - downvote) hesaplanır."
      },
      "RatingSummary": {
        "properties": {
          "place_id": {
            "type": "integer",
            "title": "Place Id"
          },
          "average_rating": {
            "type": "number",
            "title": "Average Rating"
          },
          "total_reviews": {
            "type": "integer",
            "title": "Total Reviews"
          }
        },
        "type": "object",
        "required": [
          "place_id",
          "average_rating",
          "total_reviews"
        ],
        "title": "RatingSummary",
        "description": "Tesis için ortalama rating özeti."
      },
      "RegisterRequest": {
        "properties": {
          "email": {
            "type": "string",
            "format": "email",
            "title": "Email"
          },
          "password": {
            "type": "string",
            "title": "Password"
          },
          "display_name": {
            "type": "string",
            "title": "Display Name"
          }
        },
        "type": "object",
        "required": [
          "email",
          "password",
          "display_name"
        ],
        "title": "RegisterRequest",
        "description": "Kullanıcı kaydı request."
      },
      "ReviewCreate": {
        "properties": {
          "rating": {
            "type": "integer",
            "maximum": 5,
            "minimum": 1,
            "title": "Rating",
            "description": "Rating: 1-5 stars"
          },
          "comment": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Comment"
          }
        },
        "type": "object",
        "required": [
          "rating"
        ],
        "title": "ReviewCreate",
        "description": "Review oluşturma request."
      },
      "ReviewRead": {
        "properties": {
          "id": {
            "type": "integer",
            "title": "Id"
          },
          "user_id": {
            "type": "integer",
            "title": "User Id"
          },
          "place_id": {
            "type": "integer",
            "title": "Place Id"
          },
          "rating": {
            "type": "integer",
            "title": "Rating"
          },
          "comment": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Comment"
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "title": "Created At"
          }
        },
        "type": "object",
        "required": [
          "id",
          "user_id",
          "place_id",
          "rating",
          "comment",
          "created_at"
        ],
        "title": "ReviewRead",
        "description": "Review read response."
      },
      "ReviewUpdate": {
        "properties": {
          "rating": {
            "anyOf": [
              {
                "type": "integer",
                "maximum": 5,
                "minimum": 1
              },
              {
                "type": "null"
              }
            ],
            "title": "Rating",
            "description": "Rating: 1-5 stars"
          },
          "comment": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Comment"
          }
        },
        "type": "object",
        "title": "ReviewUpdate",
        "description": "Review güncelleme request."
      },
      "SlotImport": {
        "properties": {
          "place_id": {
            "type": "integer",
            "title": "Place Id"
          },
          "branch": {
            "type": "string",
            "title": "Branch"
          },
          "field_name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Field Name"
          },
          "saha_external_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Saha External Id"
          },
          "start_time": {
            "type": "string",
            "format": "time",
            "title": "Start Time"
          },
          "end_time": {
            "type": "string",
            "format": "time",
            "title": "End Time"
          },
          "date": {
            "type": "string",
            "format": "date",
            "title": "Date"
          },
          "status": {
            "type": "string",
            "title": "Status"
          },
          "free_person": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Free Person"
          },
          "raw_element_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Raw Element Id"
          },
          "raw_classes": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Raw Classes"
          },
          "source": {
            "type": "string",
            "title": "Source",
            "default": "muratpasa"
          }
        },
        "type": "object",
        "required": [
          "place_id",
          "branch",
          "start_time",
          "end_time",
          "date",
          "status"
        ],
        "title": "SlotImport",
        "description": "BF4.py script'inden gelen slot verisi (import için).\n\nAdmin endpoint'inde kullanılacak."
      },
      "SlotImportBatch": {
        "properties": {
          "slots": {
            "items": {
              "$ref": "#/components/schemas/SlotImport"
            },
            "type": "array",
            "title": "Slots"
          }
        },
        "type": "object",
        "required": [
          "slots"
        ],
        "title": "SlotImportBatch",
        "description": "Toplu slot import için."
      },
      "SlotRead": {
        "properties": {
          "id": {
            "type": "integer",
            "title": "Id"
          },
          "place_id": {
            "type": "integer",
            "title": "Place Id"
          },
          "branch": {
            "type": "string",
            "title": "Branch"
          },
          "field_name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Field Name"
          },
          "start_time": {
            "type": "string",
            "format": "time",
            "title": "Start Time"
          },
          "end_time": {
            "type": "string",
            "format": "time",
            "title": "End Time"
          },
          "date": {
            "type": "string",
            "format": "date",
            "title": "Date"
          },
          "status": {
            "type": "string",
            "title": "Status"
          },
          "free_person": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Free Person"
          },
          "source": {
            "type": "string",
            "title": "Source"
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "title": "Created At"
          }
        },
        "type": "object",
        "required": [
          "id",
          "place_id",
          "branch",
          "field_name",
          "start_time",
          "end_time",
          "date",
          "status",
          "free_person",
          "source",
          "created_at"
        ],
        "title": "SlotRead",
        "description": "Slot read response."
      },
      "TokenResponse": {
        "properties": {
          "access_token": {
            "type": "string",
            "title": "Access Token"
          },
          "token_type": {
            "type": "string",
            "title": "Token Type",
            "default": "bearer"
          },
          "user_id": {
            "type": "integer",
            "title": "User Id"
          },
          "email": {
            "type": "string",
            "title": "Email"
          },
          "role": {
            "type": "string",
            "title": "Role"
          }
        },
        "type": "object",
        "required": [
          "access_token",
          "user_id",
          "email",
          "role"
        ],
        "title": "TokenResponse",
        "description": "JWT token response."
      },
      "User": {
        "properties": {
          "id": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Id"
          },
          "email": {
            "type": "string",
            "maxLength": 255,
            "title": "Email",
            "description": "Unique email address for login"
          },
          "password_hash": {
            "type": "string",
            "maxLength": 255,
            "title": "Password Hash",
            "description": "Bcrypt hashed password"
          },
          "display_name": {
            "type": "string",
            "maxLength": 100,
            "title": "Display Name",
            "description": "Display name visible to other users"
          },
          "role": {
            "type": "string",
            "maxLength": 20,
            "title": "Role",
            "description": "User role: 'user' or 'admin'",
            "default": "user"
          },
          "is_banned": {
            "type": "boolean",
            "title": "Is Banned",
            "description": "If True, user cannot post/comment/vote",
            "default": false
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "title": "Created At",
            "description": "Account creation timestamp"
          },
          "updated_at": {
            "type": "string",
            "format": "date-time",
            "title": "Updated At",
            "description": "Last update timestamp"
          }
        },
        "type": "object",
        "required": [
          "email",
          "password_hash",
          "display_name"
        ],
        "title": "User",
        "description": "Kullanıcı entity.\n\nAttributes:\n    id: Primary key\n    email: Unique email (login için)\n    password_hash: Bcrypt hash\n    display_name: Görünen ad\n    role: \"user\" veya \"admin\"\n    is_banned: Ban durumu (True ise post/comment/vote yapamaz)\n    created_at: Kayıt tarihi\n    updated_at: Son güncelleme"
      },
      "UserRead": {
        "properties": {
          "id": {
            "type": "integer",
            "title": "Id"
          },
          "email": {
            "type": "string",
            "format": "email",
            "title": "Email"
          },
          "display_name": {
            "type": "string",
            "title": "Display Name"
          },
          "role": {
            "type": "string",
            "title": "Role"
          },
          "is_banned": {
            "type": "boolean",
            "title": "Is Banned"
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "title": "Created At"
          }
        },
        "type": "object",
        "required": [
          "id",
          "email",
          "display_name",
          "role",
          "is_banned",
          "created_at"
        ],
        "title": "UserRead",
        "description": "User read response (public bilgiler)."
      },
      "UserUpdate": {
        "properties": {
          "display_name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Display Name"
          }
        },
        "type": "object",
        "title": "UserUpdate",
        "description": "User update request (şimdilik sadece display_name)."
      },
      "ValidationError": {
        "properties": {
          "loc": {
            "items": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "integer"
                }
              ]
            },
            "type": "array",
            "title": "Location"
          },
          "msg": {
            "type": "string",
            "title": "Message"
          },
          "type": {
            "type": "string",
            "title": "Error Type"
          }
        },
        "type": "object",
        "required": [
          "loc",
          "msg",
          "type"
        ],
        "title": "ValidationError"
      },
      "VoteCreate": {
        "properties": {
          "target_type": {
            "$ref": "#/components/schemas/VoteTargetType"
          },
          "target_id": {
            "type": "integer",
            "title": "Target Id"
          },
          "value": {
            "$ref": "#/components/schemas/VoteValue"
          }
        },
        "type": "object",
        "required": [
          "target_type",
          "target_id",
          "value"
        ],
        "title": "VoteCreate",
        "description": "Vote oluşturma/güncelleme request.\n\nGeneric vote endpoint için kullanılır."
      },
      "VoteResponse": {
        "properties": {
          "message": {
            "type": "string",
            "title": "Message"
          },
          "new_score": {
            "type": "integer",
            "title": "New Score"
          }
        },
        "type": "object",
        "required": [
          "message",
          "new_score"
        ],
        "title": "VoteResponse",
        "description": "Vote response."
      },
      "VoteTargetType": {
        "type": "string",
        "enum": [
          "post",
          "comment"
        ],
        "title": "VoteTargetType",
        "description": "Vote target type."
      },
      "VoteValue": {
        "type": "integer",
        "enum": [1, -1],
        "title": "VoteValue",
        "description": "Vote value."
      }
    },
    "securitySchemes": {
      "Bearer": {
        "type": "http",
        "description": "JWT Bearer token (Authorization: Bearer \u003Ctoken\u003E)",
        "scheme": "bearer"
      }
    }
  }
}